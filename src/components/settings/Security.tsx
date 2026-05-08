import { Input } from "../../pages/SettingsPage";

export default function Security() {
    return (
        <section className="space-y-5">
            <div className="space-y-1">
                <h3 className="text-[20px] font-medium">Security</h3>
                <p className="text-[14px] text-[#5a5f6d]">
                    Ensure your account is using a long, random password.
                </p>
            </div>

            <div className="bg-white border border-[#b6b8cc] rounded-sm p-6 space-y-5">
                <Input label="Current Password" placeholder="••••••••••••" />

                <div className="grid md:grid-cols-2 gap-5">
                    <Input label="New Password" />
                    <Input label="Confirm Password" />
                </div>

                <div className="flex justify-end">
                    <button className="px-5 py-2 text-[14px] bg-[#0038ff] text-white rounded-sm hover:opacity-90">
                        Update Password
                    </button>
                </div>
            </div>
        </section>
    );
}
