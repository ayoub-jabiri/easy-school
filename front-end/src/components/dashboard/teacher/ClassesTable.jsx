import { Link } from "react-router";
import NoDataAvailable from "../../global/NoDataAvailable";

export default function ClassesTable({ data = [] }) {
    return (
        <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-base font-bold text-slate-900">
                    My Classes
                </h3>
            </div>

            <div className="mt-5 overflow-x-auto">
                {!data.length && (
                    <NoDataAvailable message="No classes available." />
                )}

                {data.length > 0 && (
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="text-xs font-medium text-slate-400">
                                <th className="pb-3 pr-4">Class</th>
                                <th className="pb-3 pr-4">Subject</th>
                                <th className="pb-3 pr-4">Students</th>
                                <th className="pb-3 pr-4">Room</th>
                                <th className="pb-3 pr-4">Schedule</th>
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
                                            {`${cls.level[0]}${cls.levelYear}`}
                                        </Link>
                                    </td>
                                    <td className="py-3 pr-4 text-slate-600">
                                        {cls.subjectTitle}
                                    </td>
                                    <td className="py-3 pr-4 text-slate-600">
                                        {cls.students.length}
                                    </td>
                                    <td className="py-3 pr-4 text-slate-600">
                                        Room{" "}
                                        {cls.schoolRoomId?.roomNumber || "N/A"}
                                    </td>
                                    <td className="py-3 pr-4 text-slate-600">
                                        Uknown
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
