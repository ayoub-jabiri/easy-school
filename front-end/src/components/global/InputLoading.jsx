import { LoaderCircle } from "lucide-react";

export default function InputLoading() {
    return (
        <div className="flex items-center justify-center">
            <LoaderCircle className="animate-spin text-white" size={24} />
        </div>
    );
}
