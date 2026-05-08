export default function DangerZone() {
    return (
        <section className="space-y-5">
            <div className="space-y-1">
                <h3 className="text-[20px] font-medium text-[#ba1a1a]">
                    Danger Zone
                </h3>
                <p className="text-[14px] text-[#5a5f6d]">
                    Irreversible actions that affect your account.
                </p>
            </div>

            <div className="bg-white border border-[#e5a4a0] rounded-sm p-6 flex flex-col md:flex-row justify-between gap-5">
                <div className="space-y-1">
                    <p className="text-[14px] font-medium">Delete Account</p>
                    <p className="text-[14px] text-[#5a5f6d]">
                        Once you delete your account, there is no going back.
                    </p>
                </div>

                <button className="px-5 py-2 text-[14px] bg-[#ba1a1a] text-white rounded-sm hover:opacity-90 whitespace-nowrap">
                    Delete Account
                </button>
            </div>
        </section>
    );
}
