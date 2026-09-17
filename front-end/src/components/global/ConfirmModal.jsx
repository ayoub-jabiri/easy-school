import { AlertTriangle, X } from "lucide-react";
import InputLoading from "./InputLoading";

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Are you sure?",
    message,
    confirmLabel = "Delete",
    loading = false,
}) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
            <div className="w-full max-w-md rounded-md bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-600">
                            <AlertTriangle className="h-4 w-4" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900">
                            {title}
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-slate-400 transition hover:text-slate-600 cursor-pointer"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <p className="mt-4 text-sm text-slate-600">{message}</p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-md px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60 cursor-pointer"
                    >
                        {loading ? <InputLoading /> : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
