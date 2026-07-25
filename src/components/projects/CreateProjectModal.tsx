import { X } from "lucide-react";
import { useState } from "react";

interface CreateProjectForm {
    name: string;
    redisConnection: string;
    description: string;
}

interface CreateProjectModalProps {
    onClose: () => void;
    onSubmit: (form: CreateProjectForm) => Promise<void>;
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
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!form.name.trim()) return;
        setError(null);
        setIsSubmitting(true);
        try {
            await onSubmit(form);
            // Modal closes on success, so we don't strictly need to clear form
        } catch (err: any) {
            console.error("Error creating project:", err);
            if (err.response?.data?.errors?.redis_url?.[0]) {
                setError(err.response.data.errors.redis_url[0]);
            } else if (err.response?.data?.errors?.name?.[0]) {
                setError(err.response.data.errors.name[0]);
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("An unexpected error occurred while creating the project.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        >
            <div
                className="w-full max-w-md flex flex-col overflow-hidden"
                style={{
                    background: "var(--color-surface-container)",
                    border: "1px solid var(--color-outline-variant)",
                    borderRadius: 12,
                    boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
                }}
            >
                {/* Header */}
                <div
                    className="px-6 py-4 flex justify-between items-center"
                    style={{ borderBottom: "1px solid var(--color-outline-variant)" }}
                >
                    <h2
                        className="text-[20px] font-medium tracking-tight"
                        style={{ color: "var(--color-primary)" }}
                    >
                        Create New Project
                    </h2>
                    <button
                        onClick={onClose}
                        className="transition-colors cursor-pointer"
                        style={{ color: "var(--color-on-surface-variant)" }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.color = "var(--color-on-surface)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "var(--color-on-surface-variant)")
                        }
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <div>
                        <label
                            className="block text-[14px] font-medium tracking-wide mb-1.5"
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Project Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 text-[14px] outline-none transition-all rounded-md"
                            style={{
                                background: "var(--color-surface-container-high)",
                                border: "1px solid var(--color-outline-variant)",
                                color: "var(--color-on-surface)",
                            }}
                            placeholder="e.g. Analytics-Engine"
                            value={form.name}
                            onFocus={(e) =>
                                (e.currentTarget.style.border = "1px solid var(--color-primary)")
                            }
                            onBlur={(e) =>
                                (e.currentTarget.style.border =
                                    "1px solid var(--color-outline-variant)")
                            }
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label
                            className="block text-[14px] font-medium tracking-wide mb-1.5"
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Redis Connection String
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 text-[14px] font-mono outline-none transition-all rounded-md"
                            style={{
                                background: "var(--color-surface-container-high)",
                                border: "1px solid var(--color-outline-variant)",
                                color: "var(--color-on-surface)",
                            }}
                            placeholder="redis://localhost:6379"
                            value={form.redisConnection}
                            onFocus={(e) =>
                                (e.currentTarget.style.border = "1px solid var(--color-primary)")
                            }
                            onBlur={(e) =>
                                (e.currentTarget.style.border =
                                    "1px solid var(--color-outline-variant)")
                            }
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    redisConnection: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label
                            className="block text-[14px] font-medium tracking-wide mb-1.5"
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Project Description{" "}
                            <span
                                className="font-normal"
                                style={{ color: "var(--color-outline)" }}
                            >
                                (Optional)
                            </span>
                        </label>
                        <textarea
                            className="w-full px-3 py-2 text-[14px] outline-none transition-all resize-none rounded-md"
                            style={{
                                background: "var(--color-surface-container-high)",
                                border: "1px solid var(--color-outline-variant)",
                                color: "var(--color-on-surface)",
                            }}
                            placeholder="Briefly describe the purpose of this infrastructure monitor..."
                            rows={3}
                            value={form.description}
                            onFocus={(e) =>
                                (e.currentTarget.style.border = "1px solid var(--color-primary)")
                            }
                            onBlur={(e) =>
                                (e.currentTarget.style.border =
                                    "1px solid var(--color-outline-variant)")
                            }
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div
                        className="px-6 pb-4"
                    >
                        <div className="p-3 rounded-md text-[13px]" style={{ background: "var(--color-error-container)", color: "var(--color-on-error-container)" }}>
                            {error}
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div
                    className="px-6 py-4 flex justify-end gap-3"
                    style={{
                        background: "var(--color-surface-container-low)",
                        borderTop: "1px solid var(--color-outline-variant)",
                    }}
                >
                    <button
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="px-4 py-2 text-[14px] font-medium rounded-md transition-colors disabled:opacity-50"
                        style={{ color: "var(--color-on-surface-variant)" }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                                "var(--color-surface-container-high)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "transparent")
                        }
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!form.name.trim() || !form.redisConnection.trim() || isSubmitting}
                        className="px-4 py-2 text-[14px] font-medium rounded-md transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                        style={{
                            background: "var(--color-primary)",
                            color: "var(--color-on-primary)",
                        }}
                        onMouseEnter={(e) => {
                            if (!e.currentTarget.disabled)
                                e.currentTarget.style.opacity = "0.88";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = "1";
                        }}
                    >
                        {isSubmitting ? "Creating..." : "Create Project"}
                    </button>
                </div>
            </div>
        </div>
    );
}
