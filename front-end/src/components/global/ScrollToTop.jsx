import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
    // const checkScrollPosition = window.scrollY > 300;

    function handleScrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <button
            onClick={handleScrollToTop}
            className={`fixed bottom-4 right-4 z-40 rounded-lg bg-blue-600 p-3 text-white shadow-lg hover:bg-blue-700 focus:outline-none cursor-pointer`}
        >
            <ArrowUp />
        </button>
    );
}
