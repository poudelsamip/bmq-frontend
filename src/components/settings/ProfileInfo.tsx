import { useState } from "react";
import { Input } from "../../pages/SettingsPage";
import { useAuth } from "../../context/AuthContext";
import { settingsApi } from "../../api/auth.api";
import { Lock } from "lucide-react";

export default function ProfileInfo() {
    const { user, updateUser } = useAuth();
    const [name, setName] = useState(user?.name ?? "");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSave = async () => {
        if (!name.trim()) return;
        setStatus("loading");
        setMessage("");
        try {
            const res = await settingsApi.updateProfile({ name: name.trim() });
            updateUser({ name: res.data.user.name });
            setStatus("success");
            setMessage("Profile updated successfully.");
        } catch (err: unknown) {
            setStatus("error");
            const msg =
                (err as { response?: { data?: { message?: string } } })?.response?.data
                    ?.message ?? "Failed to update profile.";
            setMessage(msg);
        }
    };

    return (
        <section className="space-y-5">
            <div className="space-y-1">
                <h3
                    className="text-[20px] font-medium"
                    style={{ color: "var(--color-on-surface)", fontFamily: "Manrope, sans-serif" }}
                >
                    Profile Information
                </h3>
                <p className="text-[14px]" style={{ color: "var(--color-on-surface-variant)" }}>
                    Update your display name. Email address cannot be changed.
                </p>
            </div>

            <div
                className="rounded p-6 space-y-5"
                style={{
                    background: "var(--color-surface-container)",
                    border: "1px solid var(--color-outline-variant)",
                }}
            >
                <div className="grid md:grid-cols-2 gap-5">
                    <Input
                        label="Full Name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (status !== "idle") setStatus("idle");
                        }}
                    />

                    {/* Email — read only */}
                    <div className="space-y-1">
                        <label
                            className="text-[11px] uppercase tracking-wider"
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                readOnly
                                value={user?.email ?? ""}
                                className="w-full rounded px-3 py-2 text-[14px] outline-none pr-9"
                                style={{
                                    background: "var(--color-surface-container-highest, #2a2a2a)",
                                    border: "1px solid var(--color-outline-variant)",
                                    color: "var(--color-on-surface-variant)",
                                    cursor: "not-allowed",
                                    opacity: 0.7,
                                }}
                            />
                            <span
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[14px]"
                                title="Email cannot be changed"
                                style={{ color: "var(--color-on-surface-variant)" }}
                            >
                            <Lock size={14} />
                            </span>
                        </div>
                    </div>
                </div>

                {/* Status message */}
                {status !== "idle" && status !== "loading" && (
                    <p
                        className="text-[13px] px-3 py-2 rounded"
                        style={{
                            background:
                                status === "success"
                                    ? "rgba(34,197,94,0.12)"
                                    : "rgba(239,68,68,0.12)",
                            color:
                                status === "success"
                                    ? "rgb(74,222,128)"
                                    : "rgb(248,113,113)",
                            border: `1px solid ${status === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
                        }}
                    >
                        {message}
                    </p>
                )}

                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={status === "loading" || !name.trim()}
                        className="px-5 py-2 text-[14px] rounded transition-opacity hover:opacity-80 disabled:opacity-50"
                        style={{
                            background: "var(--color-primary-container)",
                            color: "white",
                        }}
                    >
                        {status === "loading" ? "Saving…" : "Save Profile"}
                    </button>
                </div>
            </div>
        </section>
    );
}
