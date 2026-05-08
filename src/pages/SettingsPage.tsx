import DangerZone from "../components/settings/DangerZone";
import Notification from "../components/settings/Notification";
import ProfileInfo from "../components/settings/ProfileInfo";
import Security from "../components/settings/Security";

export default function SettingsContent() {
    return (
        <main className="min-h-screen text-[#2b2f3a]">
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

/* Input */
export function Input({
    label,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
    return (
        <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-[#5a5f6d]">
                {label}
            </label>
            <input
                {...props}
                className="w-full border border-[#b6b8cc] rounded-sm px-3 py-2 text-[14px] text-[#2b2f3a] outline-none focus:ring-1 focus:ring-[#0038ff]"
            />
        </div>
    );
}
