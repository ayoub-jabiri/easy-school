import { Pencil, Trash2, GraduationCap } from "lucide-react";
import { getGradeBadgeStyle, getLetterGrade } from "../../../lib/styles.utils";

export default function GradeHeader({ grade, isOwner, onEdit, onDelete }) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                        <GraduationCap className="h-6 w-6" />
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-xl font-bold capitalize text-slate-900">
                                {grade.evaluation}
                            </h1>

                            <span
                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${getGradeBadgeStyle(
                                    grade.grade
                                )}`}
                            >
                                {grade.grade} / 20 (
                                {getLetterGrade(grade.grade)})
                            </span>
                        </div>

                        <p className="mt-1 text-sm font-medium capitalize text-sky-600">
                            {grade.classId?.subjectId?.title} —{" "}
                            {grade.classId?.level} Year{" "}
                            {grade.classId?.levelYear} (Group{" "}
                            {grade.classId?.group})
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            Awarded to{" "}
                            <span className="font-medium text-slate-600">
                                {grade.studentId?.fullName || "Unknown"}
                            </span>{" "}
                            on{" "}
                            {grade.createdAt
                                ? grade.createdAt.split("T")[0]
                                : "an unknown date"}
                        </p>
                    </div>
                </div>

                {isOwner && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onEdit}
                            className="flex items-center gap-1.5 rounded-lg bg-teal-100 px-3 py-2 text-sm font-medium text-teal-700 transition hover:bg-teal-200 cursor-pointer"
                        >
                            <Pencil className="h-4 w-4" />
                            Edit Grade
                        </button>

                        <button
                            onClick={onDelete}
                            className="flex items-center gap-1.5 rounded-lg bg-violet-100 px-3 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-200 cursor-pointer"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete Grade
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
