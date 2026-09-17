import { Link } from "react-router";
import Avatar from "../../global/Avatar";
import NoDataAvailable from "../../global/NoDataAvailable";

export default function LatestRegisteredStudents({ data }) {
    const students = data.map((student) => {
        return {
            fullName: student.fullName,
            email: student.email,
            id: student._id,
            registrationDate: student.createdAt.split("T")[0],
            Gender: student.gender,
        };
    });

    return (
        <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-base font-bold text-slate-900">
                    Latest Registered Students
                </h3>
            </div>

            <div className="mt-5 overflow-x-auto">
                {!students.length && (
                    <NoDataAvailable message="No registered students available." />
                )}

                {students.length > 0 && (
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="text-xs font-medium text-slate-400">
                                <th className="pb-3 pr-4">Info</th>
                                <th className="pb-3 pr-4">Student ID</th>
                                <th className="pb-3 pr-4">Registration Date</th>
                                <th className="pb-3 pr-4">Gender</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr
                                    key={student.id}
                                    className="border-t border-slate-50 text-sm hover:bg-violet-50"
                                >
                                    <td className="py-3 pr-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar name={student.fullName} />
                                            <div>
                                                <Link
                                                    to={`/users/${student.id}`}
                                                    className="font-semibold text-slate-800 hover:underline"
                                                >
                                                    {student.fullName}
                                                </Link>
                                                <p className="text-xs text-slate-400">
                                                    {student.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 pr-4 text-slate-600">
                                        {student.id}
                                    </td>
                                    <td className="py-3 pr-4 text-slate-600">
                                        {student.registrationDate}
                                    </td>
                                    <td className="py-3 pr-4 text-slate-600 capitalize">
                                        {student.Gender}
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
