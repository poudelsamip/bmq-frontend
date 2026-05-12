import { Input } from "../../pages/SettingsPage";

export default function ProfileInfo() {
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
                    Update your account's profile information and email address.
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
                    <Input label="Full Name" defaultValue="Alex Rivera" />
                    <Input label="Email Address" defaultValue="alex.rivera@qmon-pulse.io" />
                </div>

                <div className="flex justify-end">
                    <button
                        className="px-5 py-2 text-[14px] rounded transition-opacity hover:opacity-80"
                        style={{
                            background: "var(--color-primary-container)",
                            color: "white",
                        }}
                    >
                        Save Profile
                    </button>
                </div>
            </div>
        </section>
    );
}
