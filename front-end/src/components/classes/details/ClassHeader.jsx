import { School } from "lucide-react";

export default function ClassHeader({ classData }) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                        <School className="h-6 w-6" />
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-xl font-bold text-slate-900 capitalize">
                                {classData.level} - Year {classData.levelYear}
                            </h1>

                            <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700">
                                Group {classData.group}
                            </span>

                            <span
                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                    classData.teacherId
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-amber-100 text-amber-700"
                                }`}
                            >
                                {classData.teacherId
                                    ? "Teacher Assigned"
                                    : "No Teacher"}
                            </span>
                        </div>

                        <p className="mt-1 text-sm capitalize text-slate-500">
                            {classData.level} class
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5 text-sm">
                    <div>
                        <p className="text-xs text-slate-400">School Room</p>

                        <p className="mt-1 font-semibold text-slate-700">
                            {classData.schoolRoomId
                                ? "Assigned"
                                : "Not assigned"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-400">Students</p>

                        <p className="mt-1 font-semibold text-slate-700">
                            {classData.students?.length || 0}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
