import { MoreHorizontal } from "lucide-react";

export default function CardShell({ title, action, children, className = "" }) {
    return (
        <div className={`rounded-2xl bg-white p-5 shadow-sm ${className}`}>
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800">
                    {title}
                </h3>
                {action ?? (
                    <button className="text-slate-400 hover:text-slate-600">
                        <MoreHorizontal className="h-4 w-4" />
                    </button>
                )}
            </div>
            {children}
        </div>
    );
}
