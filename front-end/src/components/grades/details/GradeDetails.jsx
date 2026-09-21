import { BookOpen, Calendar, User } from "lucide-react";
import { getGradeBadgeStyle, getLetterGrade } from "../../../lib/styles.utils";

export default function GradeDetails({ grade }) {
    const percentage = Math.round((grade.grade / 20) * 100);

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-100 p-5">
                    <p className="text-xs text-slate-400">Score Achieved</p>
                    <p className="mt-1 text-2xl font-bold text-slate-800">
                        {grade.grade}{" "}
                        <span className="text-sm font-medium text-slate-400">
                            / 20
                        </span>
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-100 p-5">
                    <p className="text-xs text-slate-400">Percentage</p>
                    <p className="mt-1 text-2xl font-bold text-slate-800">
                        {percentage}%
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-100 p-5">
                    <p className="text-xs text-slate-400">Letter Grade</p>
                    <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-lg font-bold ${getGradeBadgeStyle(
                            grade.grade
                        )}`}
                    >
                        {getLetterGrade(grade.grade)}
                    </span>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="flex items-center gap-2 text-slate-400">
                    <BookOpen className="h-4 w-4" />
                    <div>
                        <p className="text-xs">Evaluation</p>
                        <p className="text-sm font-semibold capitalize text-slate-700">
                            {grade.evaluation}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                    <User className="h-4 w-4" />
                    <div>
                        <p className="text-xs">Graded By</p>
                        <p className="text-sm font-semibold text-slate-700">
                            {grade.teacherId?.fullName || "Unknown"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="h-4 w-4" />
                    <div>
                        <p className="text-xs">Evaluation Date</p>
                        <p className="text-sm font-semibold text-slate-700">
                            {grade.createdAt
                                ? grade.createdAt.split("T")[0]
                                : "Unknown"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
