import { Quote, Star, Check } from "lucide-react";

export default function TestimonialSection() {
    return (
        <section className="w-full bg-slate-50 px-6 py-20">
            <div className="container text-center">
                <span className="inline-block rounded-md bg-orange-50 px-3 py-1 text-xs font-semibold tracking-wide text-orange-500">
                    Student Feedback
                </span>

                <h2 className="mt-4 text-2xl font-extrabold leading-snug text-slate-900 sm:text-3xl">
                    Why Families &amp; Scholars Choose
                    <br />
                    <span className="text-teal-600">EasySchool Academy</span>
                </h2>

                <div className="relative mt-10">
                    <span className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-md">
                        <Quote className="h-4 w-4 fill-white" />
                    </span>

                    <div className="rounded-2xl bg-white p-8 text-left shadow-sm sm:p-10">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-slate-400">
                                5.0 Star Experience
                            </span>
                        </div>

                        <p className="mt-5 text-base italic leading-relaxed text-slate-600 sm:text-lg">
                            "EasySchool gave me the intellectual confidence,
                            caring mentorship, and rigorous foundation I needed.
                            From challenging AP Science labs to personal college
                            counseling, the faculty truly supported my ambitions
                            to study Pre-Med at Stanford."
                        </p>

                        <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                                    LM
                                </span>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">
                                        Lucas Martin
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        Class Valedictorian, Admitted to
                                        Stanford University
                                    </p>
                                </div>
                            </div>

                            <span className="flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600">
                                <Check className="h-3.5 w-3.5" />
                                Alumni Class of 2023
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
