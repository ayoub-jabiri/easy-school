import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
            <div className="w-full max-w-2xl rounded-md bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-slate-400 transition hover:text-slate-600 cursor-pointer"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="max-h-100 overflow-auto">{children}</div>
            </div>
        </div>
    );
}
