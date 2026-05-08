import axios, { type InternalAxiosRequestConfig } from "axios";

const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

// Token store
let _token: string | null = null;
export const tokenStore = {
    get: () => _token,
    set: (t: string | null) => {
        _token = t;
    },
};

// axios instance
const api = axios.create({ baseURL: BASE, withCredentials: true });

// Request interceptor to add the token
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (_token) config.headers.Authorization = `Bearer ${_token}`;
    return config;
});

// silent refresh and replay
type Waiter = {
    resolve: (token: string) => void;
    reject: (e: unknown) => void;
};
let refreshing = false;
let waiters: Waiter[] = [];

function flush(err: unknown, token?: string) {
    waiters.forEach((w) => (err ? w.reject(err) : w.resolve(token!)));
    waiters = [];
}

const SKIP = ["/auth/refresh", "/auth/login", "/auth/signup"];

api.interceptors.response.use(
    (r) => r,
    async (error) => {
        const cfg = error.config;
        const skip = SKIP.some((u) => cfg?.url?.includes(u));

        if (error.response?.status !== 401 || cfg?._retry || skip) {
            return Promise.reject(error);
        }

        if (refreshing) {
            const token = await new Promise<string>((resolve, reject) => {
                waiters.push({ resolve, reject });
            });
            cfg.headers.Authorization = `Bearer ${token}`;
            return api(cfg);
        }

        cfg._retry = true;
        refreshing = true;

        try {
            const { data } = await axios.post<{
                data: { accessToken: string; user: unknown };
            }>(`${BASE}/auth/refresh`, {}, { withCredentials: true });

            const token = data.data.accessToken;
            tokenStore.set(token);

            flush(null, token);

            cfg.headers.Authorization = `Bearer ${token}`;

            return api(cfg);
        } catch (e) {
            flush(e);
            tokenStore.set(null);

            window.dispatchEvent(new Event("auth:expired"));

            return Promise.reject(e);
        } finally {
            refreshing = false;
        }
    },
);

export default api;
