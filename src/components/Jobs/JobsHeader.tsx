import { Search } from "lucide-react";

export default function JobsHeader() {
    return (
        <div className="flex items-center justify-between mb-4">
            {/* Search */}
            <div className="relative w-full max-w-md">
                <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
                    style={{ color: "var(--color-on-surface-variant)" }}
                >
                    <Search size={16} />
                </span>
                <input
                    placeholder="Search jobs by ID or name..."
                    className="w-full pl-9 pr-3 py-2 rounded text-sm focus:outline-none"
                    style={{
                        background: "var(--color-surface-container)",
                        border: "1px solid var(--color-outline-variant)",
                        color: "var(--color-on-surface)",
                    }}
                    onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "var(--color-primary)")
                    }
                    onBlur={(e) =>
                        (e.currentTarget.style.borderColor =
                            "var(--color-outline-variant)")
                    }
                />
            </div>

            {/* Action */}
            <button
                className="ml-4 px-4 py-2 rounded text-sm font-medium transition-opacity hover:opacity-80"
                style={{
                    background: "var(--color-error-container)",
                    color: "var(--color-on-error-container)",
                    border: "1px solid var(--color-error)",
                }}
            >
                Pause Queue
            </button>
        </div>
    );
}
