export default function AboutSection() {
    const stats = [
        {
            value: "35",
            suffix: "+",
            suffixColor: "text-orange-500",
            label: "Years of School Academic Tradition",
        },
        {
            value: "2,400",
            suffix: "+",
            suffixColor: "text-blue-500",
            label: "Enrolled K-12 Scholars",
        },
        {
            value: "140",
            suffix: "+",
            suffixColor: "text-teal-500",
            label: "Dedicated & Certified Teachers",
        },
        {
            value: "99",
            suffix: "%",
            suffixColor: "text-teal-500",
            label: "University & College Acceptance",
        },
    ];

    return (
        <section className="w-full bg-white px-6 py-20">
            <div className="container text-center">
                <span className="text-sm font-semibold uppercase tracking-wide text-teal-600">
                    About Us
                </span>

                <h2 className="mx-auto mt-4 max-w-3xl text-2xl font-extrabold leading-snug text-slate-900 sm:text-3xl lg:text-4xl">
                    Dedicated to nurturing academic excellence, critical
                    inquiry, and character across all formative years.
                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-sm text-slate-400 sm:text-base">
                    Our certified faculty provides rigorous college preparatory
                    academics and enriching extracurricular programs.
                </p>

                <div className="mt-16 grid grid-cols-2 gap-y-10 border-t border-slate-100 pt-12 sm:grid-cols-4 sm:gap-y-0">
                    {stats.map((stat) => (
                        <div key={stat.label} className="px-2">
                            <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                                {stat.value}
                                <span className={stat.suffixColor}>
                                    {stat.suffix}
                                </span>
                            </p>
                            <p className="mt-2 text-sm leading-snug text-slate-400">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
