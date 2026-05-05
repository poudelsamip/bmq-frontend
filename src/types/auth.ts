export interface SafeUser {
    id: string;
    name: string;
    email: string;
    authProvider: "local" | "google" | "github";
    isEmailVerified: boolean;
    createdAt: string;
}
