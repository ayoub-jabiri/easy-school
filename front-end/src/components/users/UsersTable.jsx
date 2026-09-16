import { Eye, Pencil, Trash2 } from "lucide-react";
import Avatar from "../global/Avatar";
import NoDataAvailable from "../global/NoDataAvailable";
import { Link } from "react-router";

export default function UsersTable({ users }) {
    const roleBadgeClasses = {
        admin: "bg-violet-100 text-violet-700",
        teacher: "bg-sky-100 text-sky-700",
        student: "bg-amber-100 text-amber-700",
        parent: "bg-emerald-100 text-emerald-700",
    };
    return (
        <>
            <div className="mt-5 overflow-x-auto">
                {!users.length && (
                    <NoDataAvailable message="No users available." />
                )}

                {users.length > 0 && (
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="text-xs font-medium text-slate-400">
                                <th className="pb-3 pr-4">Info</th>
                                <th className="pb-3 pr-4">User ID</th>
                                <th className="pb-3 pr-4">Role</th>
                                <th className="pb-3 pr-4">Phone</th>
                                <th className="pb-3 pr-4">Address</th>
                                <th className="pb-3 pr-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-t border-slate-50 text-sm hover:bg-violet-50"
                                >
                                    <td className="py-3 pr-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar name={user.fullName} />

                                            <div>
                                                <p className="font-semibold text-slate-800">
                                                    {user.fullName}
                                                </p>
                                                <p className="text-xs text-slate-400">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="py-3 pr-4 text-slate-600">
                                        {user.id}
                                    </td>

                                    <td className="py-3 pr-4">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                                                roleBadgeClasses[user.role]
                                            }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="py-3 pr-4 text-slate-600">
                                        {user.phone}
                                    </td>

                                    <td className="py-3 pr-4 text-slate-600">
                                        {user.address}
                                    </td>

                                    <td className="py-3 pr-4">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                to={`/users/${user._id}`}
                                                className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-600 transition hover:bg-sky-200 cursor-pointer"
                                            >
                                                <Eye className="h-3.5 w-3.5" />
                                            </Link>

                                            <button className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-100 text-teal-600 transition hover:bg-teal-200 cursor-pointer">
                                                <Pencil className="h-3.5 w-3.5" />
                                            </button>

                                            <button className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-600 transition hover:bg-violet-200 cursor-pointer">
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="mt-5 flex items-center justify-between text-sm">
                <button
                    className="rounded-lg px-3 py-1.5 text-slate-300"
                    disabled
                >
                    Prev
                </button>

                <div className="flex items-center gap-1">
                    <button className="h-7 w-7 rounded-md bg-sky-100 font-medium text-sky-600">
                        1
                    </button>
                    <button className="h-7 w-7 rounded-md text-slate-500 hover:bg-slate-100">
                        2
                    </button>
                    <button className="h-7 w-7 rounded-md text-slate-500 hover:bg-slate-100">
                        3
                    </button>
                    <span className="px-1 text-slate-400">...</span>
                    <button className="h-7 w-7 rounded-md text-slate-500 hover:bg-slate-100">
                        10
                    </button>
                </div>

                <button className="rounded-lg px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100">
                    Next
                </button>
            </div>
        </>
    );
}
