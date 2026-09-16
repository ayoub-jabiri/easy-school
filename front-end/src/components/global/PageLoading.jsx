import { LoaderCircle } from "lucide-react";

export default function PageLoading() {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <LoaderCircle className="animate-spin text-[#cfceff]" size={70} />
        </div>
    );
}
