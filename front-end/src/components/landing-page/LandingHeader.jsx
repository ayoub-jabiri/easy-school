import { Link } from "react-router";

export default function LandingHeader() {
    const navLinks = [
        { name: "Home", href: "#", active: true },
        { name: "Courses", href: "#" },
        { name: "Mentors", href: "#" },
        { name: "About Us", href: "#" },
        { name: "Reviews", href: "#" },
        { name: "FAQ", href: "#" },
    ];

    return (
        <header className="w-full bg-white py-4 border-b border-[#F1F5F9] sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-md shadow-blue-200">
                            <svg
                                className="w-7 h-7"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 14l9-5-9-5-9 5 9 5z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                />
                            </svg>
                        </div>

                        <div className="flex flex-col">
                            <div className="flex items-center">
                                <span className="text-xl font-bold text-slate-900 tracking-tight">
                                    EasySchool
                                </span>
                                <span className="w-2 h-2 ml-1 bg-orange-500 rounded-full inline-block"></span>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase -mt-0.5">
                                ONLINE ACADEMY
                            </span>
                        </div>
                    </div>
                </Link>

                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href="#"
                            className={`flex items-center space-x-2 hover:text-blue-600 font-semibold text-sm main-transition ${
                                link.active ? "text-blue-600" : ""
                            }`}
                        >
                            {link.active && (
                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                            )}
                            <span>{link.name}</span>
                        </a>
                    ))}

                    {/* <a
                        href="#"
                        className="flex items-center space-x-2 text-blue-600 font-semibold text-sm"
                    >
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        <span>Home</span>
                    </a>
                    <a
                        href="#"
                        className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
                    >
                        Courses
                    </a>
                    <a
                        href="#"
                        className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
                    >
                        Mentors
                    </a>
                    <a
                        href="#"
                        className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
                    >
                        About Us
                    </a>
                    <a
                        href="#"
                        className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
                    >
                        Reviews
                    </a>
                    <a
                        href="#"
                        className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
                    >
                        FAQ
                    </a> */}
                </nav>

                <div className="flex items-center space-x-6">
                    <a
                        href="#"
                        className="text-slate-700 hover:text-slate-900 font-semibold text-sm transition-colors"
                    >
                        Sign In
                    </a>
                    <button className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm px-6 py-3 rounded-2xl flex items-center space-x-2 transition-all shadow-sm">
                        <span>Join Now</span>
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
