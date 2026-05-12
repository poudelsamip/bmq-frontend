export default function DangerZone() {
    return (
        <section className="space-y-5">
            <div className="space-y-1">
                <h3
                    className="text-[20px] font-medium"
                    style={{ color: "var(--color-error)", fontFamily: "Manrope, sans-serif" }}
                >
                    Danger Zone
                </h3>
                <p className="text-[14px]" style={{ color: "var(--color-on-surface-variant)" }}>
                    Irreversible actions that affect your account.
                </p>
            </div>

            <div
                className="rounded p-6 flex flex-col md:flex-row justify-between gap-5"
                style={{
                    background: "var(--color-surface-container)",
                    border: "1px solid var(--color-error)",
                }}
            >
                <div className="space-y-1">
                    <p
                        className="text-[14px] font-medium"
                        style={{ color: "var(--color-on-surface)" }}
                    >
                        Delete Account
                    </p>
                    <p className="text-[14px]" style={{ color: "var(--color-on-surface-variant)" }}>
                        Once you delete your account, there is no going back.
                    </p>
                </div>

                <button
                    className="px-5 py-2 text-[14px] rounded whitespace-nowrap font-medium transition-opacity hover:opacity-80"
                    style={{
                        background: "var(--color-error-container)",
                        color: "var(--color-on-error-container)",
                    }}
                >
                    Delete Account
                </button>
            </div>
        </section>
    );
}
