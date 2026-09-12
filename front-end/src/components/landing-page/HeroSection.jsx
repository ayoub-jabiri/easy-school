import { ArrowRight, Play, Check, BookOpen, User } from "lucide-react";

export default function HeroSection() {
    const avatarColors = [
        "bg-blue-500",
        "bg-orange-500",
        "bg-green-500",
        "bg-purple-500",
    ];
    const avatarInitials = ["JD", "AL", "MK", "SD"];

    return (
        <section className="w-full bg-gradient-to-br from-orange-50 via-white to-teal-50 py-16 md:py-24">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
                <div className="container">
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                        Inspiring Minds
                        <br />
                        Deeper Learning &amp;
                        <br />
                        <span className="relative inline-block text-orange-500">
                            Academic Growth
                            <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-orange-500" />
                        </span>
                    </h1>

                    <p className="mt-8 text-base leading-relaxed text-slate-500 sm:text-lg">
                        Fostering intellectual curiosity, foundational sciences,
                        classical arts, and character development. We prepare
                        young scholars from kindergarten through high school for
                        top universities and lifelong leadership.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-6">
                        <button className="flex items-center gap-2 rounded-lg bg-teal-700 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800">
                            Apply for Admission
                            <ArrowRight className="h-4 w-4" />
                        </button>

                        <button className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white">
                                <Play className="h-4 w-4 fill-white" />
                            </span>
                            Virtual Campus Tour
                        </button>
                    </div>

                    <div className="mt-10 flex items-center gap-4 border-t border-slate-200 pt-6">
                        <div className="flex -space-x-3">
                            {avatarInitials.map((initials, i) => (
                                <span
                                    key={initials}
                                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-xs font-semibold text-white ${avatarColors[i]}`}
                                >
                                    {initials}
                                </span>
                            ))}
                        </div>
                        <p className="text-sm text-slate-600">
                            4.9/5 Parent Rating with 100% college acceptance
                            rate
                        </p>
                    </div>
                </div>

                <div className="relative mx-auto w-full max-w-md">
                    <div className="rounded-[2.5rem] bg-gradient-to-br from-teal-400 via-orange-300 to-yellow-300 p-[3px]">
                        <div className="relative overflow-hidden rounded-[2.4rem] bg-slate-900 px-6 pb-8 pt-10 min-h-[520px]">
                            <span className="pointer-events-none absolute right-0 top-6 select-none text-6xl font-extrabold tracking-widest text-white/5">
                                LEARN
                            </span>

                            <div className="absolute right-5 top-5 flex max-w-[220px] items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lg">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                                    IB
                                </span>
                                <div>
                                    <p className="text-xs font-semibold text-slate-900">
                                        Accredited Curriculum
                                    </p>
                                    <p className="text-[11px] text-slate-400">
                                        College Board &amp; IB World
                                    </p>
                                </div>
                            </div>

                            <div className="absolute left-0 top-[168px] flex max-w-[230px] items-start gap-3 rounded-xl bg-white px-4 py-3 shadow-lg">
                                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <Check className="h-3.5 w-3.5" />
                                </span>
                                <div>
                                    <p className="text-xs font-semibold text-slate-900">
                                        99.4% Honors Pass
                                    </p>
                                    <p className="text-[11px] leading-snug text-slate-400">
                                        National Merit Recognition
                                    </p>
                                </div>
                            </div>

                            <div className="mx-auto mt-32 flex w-52 flex-col items-center rounded-t-[9999px] bg-gradient-to-b from-teal-600 to-teal-800 pb-8 pt-10">
                                <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/40">
                                    <User className="h-8 w-8 text-white" />
                                </span>
                                <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-teal-100">
                                    Faculty Chair
                                </p>
                                <p className="mt-1 text-base font-bold text-white">
                                    Dr. Eleanor Vance
                                </p>
                            </div>

                            <div className="absolute bottom-6 left-1/2 flex w-[88%] -translate-x-1/2 items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lg">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
                                    <BookOpen className="h-4 w-4" />
                                </span>
                                <div className="flex-1">
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-orange-500">
                                        Fall Term Enrollment
                                    </p>
                                    <p className="text-xs font-semibold text-slate-900">
                                        Advanced Placement (AP) Biology
                                    </p>
                                </div>
                                <span className="whitespace-nowrap text-[11px] font-medium text-slate-400">
                                    Grades 9-12
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
