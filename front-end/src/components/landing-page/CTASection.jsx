import { GraduationCap, BookOpen } from "lucide-react";

export default function CTASection() {
    return (
        <section className="w-full bg-slate-50 px-6 py-20">
            <div className="container max-w-5xl">
                <div className="text-center">
                    <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                        What Are You Looking For?
                    </h2>
                    <p className="mt-3 text-sm text-slate-400 sm:text-base">
                        Select your path to join our global learning network
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-2xl bg-white p-8 shadow-sm">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                            <GraduationCap className="h-6 w-6" />
                        </span>

                        <h3 className="mt-6 text-xl font-extrabold text-slate-900">
                            Join Our Esteemed Faculty
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-500">
                            Are you an experienced educator passionate about
                            inspiring the next generation of scholars and
                            leaders? Join our faculty team with state-of-the-art
                            facilities and competitive benefits.
                        </p>

                        <button className="mt-8 rounded-lg bg-slate-900 px-6 py-3.5 text-xs font-semibold tracking-wide text-white hover:bg-slate-800">
                            APPLY AS EDUCATOR
                        </button>
                    </div>

                    <div className="rounded-2xl bg-teal-600 p-8 shadow-sm">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white">
                            <BookOpen className="h-6 w-6" />
                        </span>

                        <h3 className="mt-6 text-xl font-extrabold text-white">
                            Enroll Your Child Today
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-teal-50">
                            Join an inspiring community dedicated to academic
                            rigor, holistic personal growth, and global
                            citizenship. Admissions are open for the upcoming
                            academic year.
                        </p>

                        <button className="mt-8 rounded-lg bg-orange-500 px-6 py-3.5 text-xs font-semibold tracking-wide text-white hover:bg-orange-600">
                            REGISTER FOR ADMISSIONS
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
