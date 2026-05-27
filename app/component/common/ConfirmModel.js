"use client";

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Are you sure?",
    description = "This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmColor = "bg-red-500"
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0b22357a] backdrop-blur-[2px] z-50 p-4">
            <div className="admin-card p-6 w-full max-w-md">

                <h2 className="text-xl font-semibold mb-2 text-[var(--admin-primary)]">{title}</h2>
                <p className="text-[var(--admin-muted)] mb-6">{description}</p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-[var(--admin-border)] text-[var(--admin-primary)] hover:bg-[#f7f6f2] transition"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`px-4 py-2 text-white rounded-lg ${confirmColor}`}
                    >
                        {confirmText}
                    </button>
                </div>

            </div>
        </div>
    );
}
