import { X } from "lucide-react";
import { useState } from "react";

interface CreateProjectForm {
    name: string;
    redisConnection: string;
    description: string;
}

interface CreateProjectModalProps {
    onClose: () => void;
    onSubmit: (form: CreateProjectForm) => void;
}

export default function CreateProjectModal({
    onClose,
    onSubmit,
}: CreateProjectModalProps) {
    const [form, setForm] = useState<CreateProjectForm>({
        name: "",
        redisConnection: "",
        description: "",
    });

    const handleSubmit = () => {
        if (!form.name.trim()) return;
        onSubmit(form);
        setForm({
            name: "",
            redisConnection: "",
            description: "",
        });
    };

    const inputClass =
        "w-full px-3 py-2 bg-[#f9f9ff] border border-[#c4c5da] rounded-sm text-[14px] text-[#151c27] focus:ring-2 focus:ring-[#0038ff] focus:border-transparent outline-none transition-all";

    const labelClass =
        "block text-[14px] font-medium tracking-wide text-[#444657] mb-1.5";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#151c27]/50 backdrop-blur-xs">
            <div className="bg-white w-full max-w-md rounded-sm shadow-xl overflow-hidden border border-[#c4c5da] flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b border-[#c4c5da] flex justify-between items-center">
                    <h2 className="text-[20px] font-medium tracking-tight text-[#0038ff]">
                        Create New Project
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-slate-600 hover:text-black transition-colors cursor-pointer"
                    >
                        <X />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <div>
                        <label className={labelClass}>Project Name</label>
                        <input
                            type="text"
                            className={inputClass}
                            placeholder="e.g. Analytics-Engine"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Redis Connection String
                        </label>
                        <input
                            type="text"
                            className={`${inputClass} font-mono`}
                            placeholder="redis://localhost:6379"
                            value={form.redisConnection}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    redisConnection: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Project Description{" "}
                            <span className="font-normal text-[#747689]">
                                (Optional)
                            </span>
                        </label>
                        <textarea
                            className={`${inputClass} resize-none`}
                            placeholder="Briefly describe the purpose of this infrastructure monitor..."
                            rows={3}
                            value={form.description}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-[#f0f3ff] border-t border-[#c4c5da] flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-[#444657] text-[14px] font-medium hover:bg-[#dfdfdf] rounded-sm transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={
                            !form.name.trim() || !form.redisConnection.trim()
                        }
                        className="px-4 py-2 bg-[#0038ff] text-white text-[14px] font-medium rounded-sm hover:opacity-90 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Create Project
                    </button>
                </div>
            </div>
        </div>
    );
}
