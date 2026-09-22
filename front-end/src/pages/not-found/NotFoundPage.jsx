import { Link } from "react-router";
import { CircleX } from "lucide-react";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="mx-auto flex max-w-full flex-col items-center justify-center rounded-2xl bg-slate-50 p-5 py-24 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <CircleX className="h-8 w-8" />
                </span>

                <p className="mt-6 text-5xl font-bold text-slate-900">404</p>

                <h1 className="mt-2 text-lg font-bold text-slate-900">
                    Page not found
                </h1>

                <p className="mt-2 max-w-sm text-sm text-slate-500">
                    The page you're looking for doesn't exist or may have been
                    moved.
                </p>

                <div className="mt-4 flex max-md:flex-col gap-3">
                    <Link
                        to="/"
                        className="w-42.5 mt-6 rounded-md bg-slate-900 border border-slate-900 px-5 py-2.5 text-sm font-semibold text-white main-transition hover:bg-slate-800"
                    >
                        Back to Home
                    </Link>
                    <Link
                        to="/dashboard"
                        className="w-42.5 mt-6 rounded-md bg-transparent border border-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-900 main-transition hover:bg-slate-900 hover:text-white"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
