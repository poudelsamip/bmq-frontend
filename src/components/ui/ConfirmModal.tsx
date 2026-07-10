import type { ReactNode } from "react";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDestructive?: boolean;
    isBusy?: boolean;
}

export default function ConfirmModal({
    isOpen,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    isDestructive = false,
    isBusy = false,
}: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
            <div
                className="w-full max-w-sm rounded p-5 shadow-lg"
                style={{
                    background: "var(--color-surface-container-high)",
                    border: "1px solid var(--color-outline-variant)",
                }}
            >
                <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: "var(--color-on-surface)" }}
                >
                    {title}
                </h3>
                <div
                    className="text-sm mb-6"
                    style={{ color: "var(--color-on-surface-variant)" }}
                >
                    {message}
                </div>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        disabled={isBusy}
                        className="px-4 py-2 rounded text-sm font-medium transition-colors"
                        style={{
                            color: "var(--color-on-surface)",
                            background: "transparent",
                            border: "1px solid var(--color-outline-variant)",
                            opacity: isBusy ? 0.5 : 1,
                        }}
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isBusy}
                        className="px-4 py-2 rounded text-sm font-medium transition-opacity"
                        style={{
                            color: isDestructive ? "var(--color-on-error)" : "var(--color-on-primary)",
                            background: isDestructive ? "var(--color-error)" : "var(--color-primary)",
                            opacity: isBusy ? 0.7 : 1,
                        }}
                    >
                        {isBusy ? "Processing..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
