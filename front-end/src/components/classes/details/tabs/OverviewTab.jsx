export default function OverviewTab({ classData }) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs text-slate-400">Total Students</p>

                    <p className="mt-1 text-2xl font-bold text-slate-800">
                        {classData.students?.length || 0}
                    </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs text-slate-400">School Room</p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                        {classData.schoolRoomId?.title || "Not assigned"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                        Room #{classData.schoolRoomId?.roomNumber || "Unknown"}
                    </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs text-slate-400">Subject</p>

                    <p className="mt-1 text-sm font-bold capitalize text-slate-800">
                        {classData.subjectId?.title || "Not assigned"}
                    </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs text-slate-400">School Level</p>

                    <p className="mt-1 text-sm font-bold capitalize text-slate-800">
                        {classData.level} - Year {classData.levelYear}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                        Group {classData.group}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div className="rounded-xl border border-slate-100 p-5">
                    <h2 className="text-sm font-bold text-slate-900">
                        Class Details
                    </h2>

                    <div className="mt-4 grid grid-cols-2 gap-y-5 text-sm">
                        <div>
                            <p className="text-xs text-slate-400">
                                School Level
                            </p>

                            <p className="font-semibold capitalize text-slate-700">
                                {classData.level}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-400">Level Year</p>

                            <p className="font-semibold text-slate-700">
                                {classData.levelYear}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-400">Group</p>

                            <p className="font-semibold text-slate-700">
                                {classData.group}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-400">Created On</p>

                            <p className="font-semibold text-slate-700">
                                {classData.createdAt
                                    ? classData.createdAt.split("T")[0]
                                    : "Unknown"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
