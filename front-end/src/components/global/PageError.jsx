import { AlertCircle, RotateCw } from "lucide-react";

export default function PageError({ message = "An error occurred" }) {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-white px-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
                <AlertCircle className="h-6 w-6" />
            </span>

            <div>
                <h2 className="text-base font-bold text-slate-900">
                    Something went wrong
                </h2>
                <p className="mt-1 max-w-sm text-sm leading-relaxed text-slate-500">
                    {message}
                </p>
            </div>

            <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
                <RotateCw className="h-4 w-4" />
                Reload
            </button>
        </div>
    );
}
