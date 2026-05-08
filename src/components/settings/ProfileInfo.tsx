import { Input } from "../../pages/SettingsPage";

export default function ProfileInfo() {
    return (
        <section className="space-y-5">
            <div className="space-y-1">
                <h3 className="text-[20px] font-medium">Profile Information</h3>
                <p className="text-[14px] text-[#5a5f6d]">
                    Update your account's profile information and email address.
                </p>
            </div>

            <div className="bg-white border border-[#b6b8cc] rounded-sm p-6 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                    <Input label="Full Name" defaultValue="Alex Rivera" />
                    <Input
                        label="Email Address"
                        defaultValue="alex.rivera@qmon-pulse.io"
                    />
                </div>

                <div className="flex justify-end">
                    <button className="px-5 py-2 text-[14px] bg-[#0038ff] text-white rounded-sm hover:opacity-90">
                        Save Profile
                    </button>
                </div>
            </div>
        </section>
    );
}
