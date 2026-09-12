import { GraduationCap, Check, Star, ArrowRight } from "lucide-react";

export default function FacultyMentorshipSection() {
    const bullets = [
        "1-on-1 personalized academic advisory & tutoring sessions",
        "Advanced Placement (AP) & International Baccalaureate tracks",
        "Comprehensive college admissions and scholarship portfolio prep",
    ];

    return (
        <section className="w-full bg-white px-6 py-20">
            <div className="container grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
                <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-blue-700 to-slate-900 p-6 shadow-xl">
                    <div className="flex items-center justify-between">
                        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
                            Head of Faculty
                        </span>
                        <span className="text-xs text-white/70">
                            EasySchool Mentorship
                        </span>
                    </div>

                    <div className="relative mt-6 h-56 rounded-2xl bg-black/10">
                        <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/30 text-red-100">
                            <GraduationCap className="h-5 w-5" />
                        </span>

                        <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-lg font-bold text-white">
                                Dr. Marcus Vance, Ph.D.
                            </p>
                            <p className="mt-1 text-xs text-white/70">
                                Head of School &amp; Dean of Academic Affairs
                            </p>
                            <div className="mt-2 flex items-center gap-1.5 text-xs text-white/70">
                                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                <span>4.98</span>
                                <span className="text-white/40">•</span>
                                <span>20+ Years Educational Leadership</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
                        <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                                98%
                            </span>
                            <div>
                                <p className="text-xs font-semibold text-white">
                                    Top University Placement
                                </p>
                                <p className="text-[11px] text-white/60">
                                    Ivy League &amp; Russell Group Admissions
                                </p>
                            </div>
                        </div>
                        <span className="text-xs font-medium text-blue-200">
                            Certified
                        </span>
                    </div>
                </div>

                <div>
                    <span className="inline-block rounded-md bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-600">
                        Faculty & Pastoral Care
                    </span>

                    <h2 className="mt-4 text-2xl font-extrabold leading-snug text-slate-900 sm:text-3xl lg:text-4xl">
                        Inspiring Mentorship &amp;{" "}
                        <span className="text-blue-600">
                            University Counseling
                        </span>{" "}
                        for Every Scholar
                    </h2>

                    <p className="mt-5 text-sm leading-relaxed text-slate-500 sm:text-base">
                        Our dedicated faculty combines high-level academic rigor
                        with compassionate homeroom mentorship. Every student
                        receives customized academic guidance, laboratory
                        research opportunities, and dedicated college
                        counseling.
                    </p>

                    <ul className="mt-6 space-y-3">
                        {bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-3">
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                                    <Check className="h-3 w-3" />
                                </span>
                                <span className="text-sm text-slate-600">
                                    {bullet}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <button className="mt-8 flex items-center gap-2 rounded-lg bg-teal-700 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800">
                        Meet Our Faculty & Deans
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
