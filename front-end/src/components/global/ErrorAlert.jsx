import { AlertCircle } from "lucide-react";
import { useSelector } from "react-redux";

export default function ErrorAlert() {
    const { error } = useSelector((state) => state.alert);

    return (
        <div className="fixed top-5 left-[50%] translate-x-[-50%] z-[100] flex items-start gap-3 rounded-lg bg-red-50 px-4 py-3">
            <span className="mt-0.5 flex h-5 w-5 items-center justify-center text-red-500">
                <AlertCircle className="h-4 w-4" />
            </span>

            <p className="flex-1 text-sm leading-relaxed text-red-600">
                {error}
            </p>
        </div>
    );
}
