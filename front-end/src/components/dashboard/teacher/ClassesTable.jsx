import { Link } from "react-router";
import NoDataAvailable from "../../global/NoDataAvailable";
import { School } from "lucide-react";

export default function ClassesTable({ data = [] }) {
    return (
        <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">
                    My Classes
                </h3>
                <Link
                    to="/classes"
                    className="text-slate-400 text-sm hover:text-slate-600"
                >
                    View All
                </Link>
            </div>

            <div className="mt-5 overflow-x-auto">
                {!data.length && (
                    <NoDataAvailable message="No classes available." />
                )}

                {data.length > 0 && (
                    <table className="w-full min-w-[420px] border-collapse text-left">
                        <thead>
                            <tr className="text-xs font-medium text-slate-400">
                                <th className="pb-3 pr-4">Class</th>
                                <th className="pb-3 pr-4">Subject</th>
                                <th className="pb-3 pr-4">Students</th>
                                <th className="pb-3 pr-4">Room</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((cls) => (
                                <tr
                                    key={cls._id}
                                    className="border-t border-slate-50 text-sm hover:bg-violet-50"
                                >
                                    <td className="py-3 pr-4 font-semibold text-slate-800 uppercase">
                                        <Link
                                            to={`/classes/${cls._id}`}
                                            className="hover:underline"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                                                    <School className="h-4 w-4" />
                                                </span>

                                                <div>
                                                    <p className="font-semibold text-slate-800 capitalize">
                                                        {cls.level} - Year{" "}
                                                        {cls.levelYear}
                                                    </p>
                                                    <p className="text-xs text-slate-400">
                                                        Group {cls.group}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="py-3 pr-4 text-slate-600">
                                        {cls?.subjectId?.title}
                                    </td>
                                    <td className="py-3 pr-4 text-slate-600">
                                        {cls.students.length}
                                    </td>
                                    <td className="py-3 pr-4 text-slate-600">
                                        Room{" "}
                                        {cls.schoolRoomId?.roomNumber || "N/A"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
