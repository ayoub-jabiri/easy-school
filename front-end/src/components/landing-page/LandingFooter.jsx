import { GraduationCap } from "lucide-react";

function TwitterIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7.1l-5.6-6.9L4.1 22H1l8.1-9.3L0.7 2h7.3l5 6.3L18.9 2Zm-1.2 18h1.9L6.4 4H4.4l13.3 16Z" />
        </svg>
    );
}

function GithubIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.68.42.36.78 1.07.78 2.17v3.21c0 .3.2.66.79.55C20.71 21.39 24 17.08 24 12c0-6.35-5.15-11.5-12-11.5Z" />
        </svg>
    );
}

function LinkedinIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 8.75h5.15V21.5H2.4V8.75Zm7.9 0h4.93v1.74h.07c.69-1.3 2.37-2.67 4.88-2.67 5.22 0 6.18 3.43 6.18 7.9v8.78h-5.14v-7.78c0-1.86-.03-4.25-2.59-4.25-2.6 0-3 2.03-3 4.11v7.92h-5.13V8.75Z" />
        </svg>
    );
}

export default function LandingFooter() {
    const platformLinks = [
        "Academic Curriculum",
        "Admissions & Aid",
        "Faculty Directory",
        "Campus Life & Arts",
    ];

    const companyLinks = [
        "About EasySchool",
        "Careers & Faculty",
        "Press & News",
        "Privacy Policy",
    ];

    return (
        <footer className="w-full bg-white px-6 py-16">
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                                <GraduationCap className="h-5 w-5" />
                            </span>
                            <span className="text-base font-extrabold text-slate-900">
                                EasySchool
                            </span>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-slate-400">
                            Empowering students, parents, and educators through
                            modern academic management, rigorous curricula, and
                            holistic education.
                        </p>
                        <div className="mt-5 flex items-center gap-3">
                            <a
                                href="#"
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                            >
                                <TwitterIcon className="h-4 w-4" />
                            </a>
                            <a
                                href="#"
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                            >
                                <GithubIcon className="h-4 w-4" />
                            </a>
                            <a
                                href="#"
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                            >
                                <LinkedinIcon className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold tracking-wide text-slate-900">
                            PLATFORM
                        </h4>
                        <ul className="mt-4 space-y-3">
                            {platformLinks.map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="text-sm text-slate-500 hover:text-slate-800"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold tracking-wide text-slate-900">
                            COMPANY
                        </h4>
                        <ul className="mt-4 space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="text-sm text-slate-500 hover:text-slate-800"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold tracking-wide text-slate-900">
                            STAY UPDATED
                        </h4>
                        <p className="mt-4 text-sm leading-relaxed text-slate-500">
                            Get our weekly tech newsletter and syllabus updates.
                        </p>
                        <div className="mt-4 space-y-3">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"
                            />
                            <button className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-14 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-slate-400">
                        © {new Date().getFullYear()} EasySchool SAS. All rights
                        reserved. Version 2.4.1-stable
                    </p>
                    <div className="flex items-center gap-6">
                        <a
                            href="#"
                            className="text-xs text-slate-400 hover:text-slate-600"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#"
                            className="text-xs text-slate-400 hover:text-slate-600"
                        >
                            Security
                        </a>
                        <a
                            href="#"
                            className="text-xs text-slate-400 hover:text-slate-600"
                        >
                            Cookies Settings
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
