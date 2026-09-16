import { CheckCircle2 } from "lucide-react";
import { useSelector } from "react-redux";

export default function SuccessAlert() {
    const { success } = useSelector((state) => state.alert);

    return (
        <div className="fixed top-5 left-[50%] translate-x-[-50%] z-[100] flex items-start gap-3 rounded-lg bg-emerald-50 px-4 py-3">
            <span className="mt-0.5 flex h-5 w-5 items-center justify-center text-emerald-500">
                <CheckCircle2 className="h-4 w-4" />
            </span>

            <p className="flex-1 text-sm leading-relaxed text-emerald-600">
                {success}
            </p>
        </div>
    );
}
