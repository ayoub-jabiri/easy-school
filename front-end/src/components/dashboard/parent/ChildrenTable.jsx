import NoDataAvailable from "../../global/NoDataAvailable";
import Avatar from "../../global/Avatar";

export default function ChildrenTable({ data = [] }) {
    return (
        <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">Students</h3>
            </div>

            <div className="mt-5 overflow-x-auto">
                {!data.length && (
                    <NoDataAvailable message="No students available." />
                )}

                {data.length > 0 && (
                    <table className="w-full min-w-[420px] border-collapse text-left">
                        <thead>
                            <tr className="text-xs font-medium text-slate-400">
                                <th className="pb-3 pr-4">Info</th>
                                <th className="pb-3 pr-4">User ID</th>
                                <th className="pb-3 pr-4">Gender</th>
                                <th className="pb-3 pr-4">Registration Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((child) => (
                                <tr
                                    key={child._id}
                                    className="border-t border-slate-50 text-sm hover:bg-violet-50"
                                >
                                    <td className="py-3 pr-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                name={
                                                    child.fullName || "Unknown"
                                                }
                                            />

                                            <div>
                                                <p className="font-semibold text-slate-800 capitalize">
                                                    {child.fullName ||
                                                        "Unknown"}
                                                </p>
                                                <p className="text-xs text-slate-400">
                                                    {child.email ||
                                                        "No email available"}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td
                                        className="py-3 pr-4 text-slate-600"
                                        title={child._id || "No ID available"}
                                    >
                                        {child._id.slice(0, 8)}...
                                    </td>

                                    <td className="py-3 pr-4 text-slate-600 capitalize">
                                        {child.gender || "No gender available"}
                                    </td>

                                    <td className="py-3 pr-4 text-slate-600">
                                        {child.createdAt.split("T")[0] ||
                                            "No registration date available"}
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
