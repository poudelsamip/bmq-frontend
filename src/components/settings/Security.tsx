import { useState } from "react";
import { Input } from "../../pages/SettingsPage";
import { settingsApi } from "../../api/auth.api";

export default function Security() {
    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const setField = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((f) => ({ ...f, [field]: e.target.value }));
        if (status !== "idle") setStatus("idle");
    };

    const handleSubmit = async () => {
        if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
            setStatus("error");
            setMessage("Please fill in all password fields.");
            return;
        }
        if (form.newPassword !== form.confirmPassword) {
            setStatus("error");
            setMessage("New passwords do not match.");
            return;
        }
        if (form.newPassword.length < 8) {
            setStatus("error");
            setMessage("New password must be at least 8 characters.");
            return;
        }

        setStatus("loading");
        setMessage("");
        try {
            await settingsApi.updatePassword(form);
            setStatus("success");
            setMessage("Password updated successfully.");
            setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err: unknown) {
            setStatus("error");
            const msg =
                (err as { response?: { data?: { message?: string } } })?.response?.data
                    ?.message ?? "Failed to update password.";
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
                    Security
                </h3>
                <p className="text-[14px]" style={{ color: "var(--color-on-surface-variant)" }}>
                    Ensure your account is using a long, random password.
                </p>
            </div>

            <div
                className="rounded p-6 space-y-5"
                style={{
                    background: "var(--color-surface-container)",
                    border: "1px solid var(--color-outline-variant)",
                }}
            >
                <Input
                    label="Current Password"
                    placeholder="••••••••••••"
                    type="password"
                    value={form.currentPassword}
                    onChange={setField("currentPassword")}
                />

                <div className="grid md:grid-cols-2 gap-5">
                    <Input
                        label="New Password"
                        type="password"
                        value={form.newPassword}
                        onChange={setField("newPassword")}
                    />
                    <Input
                        label="Confirm Password"
                        type="password"
                        value={form.confirmPassword}
                        onChange={setField("confirmPassword")}
                    />
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
                        onClick={handleSubmit}
                        disabled={status === "loading"}
                        className="px-5 py-2 text-[14px] rounded transition-opacity hover:opacity-80 disabled:opacity-50"
                        style={{
                            background: "var(--color-primary-container)",
                            color: "white",
                        }}
                    >
                        {status === "loading" ? "Updating…" : "Update Password"}
                    </button>
                </div>
            </div>
        </section>
    );
}
