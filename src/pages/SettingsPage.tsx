import DangerZone from "../components/settings/DangerZone";
import Notification from "../components/settings/Notification";
import ProfileInfo from "../components/settings/ProfileInfo";
import Security from "../components/settings/Security";

export default function SettingsContent() {
    return (
        <main
            className="min-h-screen"
            style={{
                background: "var(--color-background)",
                color: "var(--color-on-surface)",
                maxWidth: "1440px",
                margin: "0 auto",
            }}
        >
            <div className="max-w-200 space-y-10">
                {/* Profile */}
                <ProfileInfo />

                {/* Security */}
                <Security />

                {/* Notifications */}
                <Notification />

                {/* Danger Zone */}
                <DangerZone />
            </div>
        </main>
    );
}

/* Shared dark-mode Input */
export function Input({
    label,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
    return (
        <div className="space-y-1">
            <label
                className="text-[11px] uppercase tracking-wider"
                style={{ color: "var(--color-on-surface-variant)" }}
            >
                {label}
            </label>
            <input
                {...props}
                className="w-full rounded px-3 py-2 text-[14px] outline-none"
                style={{
                    background: "var(--color-surface-container)",
                    border: "1px solid var(--color-outline-variant)",
                    color: "var(--color-on-surface)",
                }}
                onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-primary)";
                    props.onFocus?.(e);
                }}
                onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-outline-variant)";
                    props.onBlur?.(e);
                }}
            />
        </div>
    );
}
