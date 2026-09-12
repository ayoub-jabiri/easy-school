import {
    Calculator,
    FlaskConical,
    BookOpen,
    Languages,
    Palette,
    Globe,
    ChevronDown,
} from "lucide-react";
import { Link } from "react-router";

export default function AcademicDepartments() {
    const departments = [
        {
            icon: Calculator,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500",
            courses: "16 Courses",
            title: "Mathematics & Calculus",
            description:
                "Algebra I & II, Euclidean Geometry, Trigonometry, AP Calculus AB/BC, and Applied Statistics.",
        },
        {
            icon: FlaskConical,
            iconBg: "bg-teal-50",
            iconColor: "text-teal-500",
            courses: "22 Courses",
            title: "Natural & Physical Sciences",
            description:
                "Physics, Inorganic & Organic Chemistry, Molecular Biology, and Environmental Field Research.",
        },
        {
            icon: BookOpen,
            iconBg: "bg-amber-50",
            iconColor: "text-amber-500",
            courses: "18 Courses",
            title: "Literature & Humanities",
            description:
                "World Literature, Rhetoric & Composition, Philosophy, and European & American Historical Studies.",
        },
        {
            icon: Languages,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-500",
            courses: "12 Courses",
            title: "Foreign Languages",
            description:
                "Immersive bilingual curricula in Spanish, French, German, and Mandarin Chinese with native instructors.",
        },
        {
            icon: Palette,
            iconBg: "bg-rose-50",
            iconColor: "text-rose-500",
            courses: "14 Courses",
            title: "Visual & Performing Arts",
            description:
                "Studio Fine Arts, Classical Music Theory, Orchestra & Theater Production, and Digital Media.",
        },
        {
            icon: Globe,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500",
            courses: "19 Courses",
            title: "Social Studies & Economics",
            description:
                "World Geography, Macro & Microeconomics, Civics, International Relations, and Ethical Philosophy.",
        },
    ];

    return (
        <section className="w-full bg-slate-50 px-6 py-20">
            <div className="container">
                <span className="inline-block rounded-md bg-orange-50 px-3 py-1 text-xs font-semibold tracking-wide text-orange-500">
                    Academic Departments
                </span>

                <h2 className="mt-4 max-w-md text-2xl font-extrabold leading-snug text-slate-900 sm:text-3xl">
                    Explore Core Disciplines &amp; Academic Programs
                </h2>

                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {departments.map((dept) => {
                        const Icon = dept.icon;
                        return (
                            <div
                                key={dept.title}
                                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                            >
                                <div className="flex items-start justify-between">
                                    <span
                                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${dept.iconBg} ${dept.iconColor}`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-400">
                                        {dept.courses}
                                    </span>
                                </div>

                                <h3 className="mt-6 text-base font-bold text-slate-900">
                                    {dept.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                    {dept.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-14 flex justify-center">
                    <Link
                        to="/"
                        className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-xs font-semibold tracking-wide text-white hover:bg-slate-800"
                    >
                        VIEW FULL CURRICULUM GUIDE
                        <ChevronDown className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
