import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    function handleScrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <button
            onClick={handleScrollToTop}
            className={`${
                scrollY > 300 ? "right-4" : "right-[-100%]"
            } fixed bottom-4 right-4 z-40 rounded-lg bg-blue-600 p-3 text-white shadow-lg hover:bg-blue-700 focus:outline-none cursor-pointer main-transition`}
        >
            <ArrowUp />
        </button>
    );
}
