import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
});

// We will add interceptors later when AuthContext is ready, 
// or manage token injection via Axios interceptors directly if we store it outside React state,
// but usually it's easier to inject it if we have a simple token manager or if we add it during the request.
// For now, let's keep a module-level variable for the token to easily inject it.
let currentToken: string | null = null;

export const setApiToken = (token: string | null) => {
    currentToken = token;
};

apiClient.interceptors.request.use((config) => {
    if (currentToken) {
        config.headers.Authorization = `Bearer ${currentToken}`;
    }
    return config;
});

// Response interceptor for handling 401s could be complex if it requires context, 
// but we can implement a basic retry mechanism.
let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: any) => void }[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/refresh' && originalRequest.url !== '/auth/login') {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers.Authorization = 'Bearer ' + token;
                        return apiClient(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Try to refresh
                const { data } = await axios.post<{ success: boolean; data: { accessToken: string } }>(
                    'http://localhost:3000/api/auth/refresh',
                    {},
                    { withCredentials: true }
                );
                
                const newToken = data.data.accessToken;
                setApiToken(newToken);
                
                // Dispatch a custom event so the React Context can pick up the new token if needed
                window.dispatchEvent(new CustomEvent('auth:token_refreshed', { detail: newToken }));

                processQueue(null, newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return apiClient(originalRequest);
            } catch (err) {
                processQueue(err, null);
                setApiToken(null);
                window.dispatchEvent(new CustomEvent('auth:logout'));
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
