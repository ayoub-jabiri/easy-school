import { useState } from "react";
import { GraduationCap, ArrowRight, Menu, X } from "lucide-react";
import { Link } from "react-router";

export default function LandingHeader() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { label: "Home", href: "#", active: true },
        { label: "Courses", href: "#" },
        { label: "Mentors", href: "#" },
        { label: "About Us", href: "#" },
        { label: "Reviews", href: "#" },
        { label: "FAQ", href: "#" },
    ];

    return (
        <header className="w-full border-b border-slate-100 bg-white sticky top-0 z-50">
            <div className="container flex h-16 items-center justify-between">
                <Link to="/" className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                        <GraduationCap className="h-5 w-5" />
                    </span>
                    <div className="leading-tight">
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-extrabold text-slate-900">
                                EasySchool
                            </span>
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        </div>
                        <p className="text-[10px] font-medium tracking-wide text-slate-400">
                            ONLINE ACADEMY
                        </p>
                    </div>
                </Link>

                <nav className="hidden items-center gap-8 lg:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={`flex items-center gap-1.5 text-sm font-medium main-transition ${
                                link.active
                                    ? "text-blue-600"
                                    : "hover:text-blue-600"
                            }`}
                        >
                            {link.active && (
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                            )}
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden items-center gap-6 lg:flex">
                    <Link
                        to="/login"
                        className="text-sm font-medium text-slate-600 hover:text-slate-900"
                    >
                        Sign In
                    </Link>
                    <button className="flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
                        Join Now
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 lg:hidden cursor-pointer"
                >
                    {isOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </button>
            </div>

            {isOpen && (
                <div className="border-t border-slate-100 pb-6 pt-4 lg:hidden">
                    <nav className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
                                    link.active
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 px-3 pt-4">
                        <a
                            href="#"
                            className="text-sm font-medium text-slate-600 hover:text-slate-900"
                        >
                            Sign In
                        </a>
                        <button className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                            Join Now
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
