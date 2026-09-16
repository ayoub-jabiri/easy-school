import { Eye, Pencil, Trash2 } from "lucide-react";
import Avatar from "../global/Avatar";
import NoDataAvailable from "../global/NoDataAvailable";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/slices/users.slice";
import PageLoading from "../global/PageLoading";
import PageError from "../global/PageError";
import { useEffect } from "react";

const roleBadgeClasses = {
    admin: "bg-violet-100 text-violet-700",
    teacher: "bg-sky-100 text-sky-700",
    student: "bg-amber-100 text-amber-700",
    parent: "bg-emerald-100 text-emerald-700",
};

export default function UsersTable({ role, limit, setLimit }) {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.users.users);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    function handlePaginationActions(action) {
        switch (action) {
            case "prev":
                dispatch(
                    getUsers({ page: data.currentPage - 1, limit: limit, role })
                );
                break;
            case "next":
                dispatch(
                    getUsers({ page: data.currentPage + 1, limit: limit, role })
                );
        }
    }

    function handleChangeUserLimit(e) {
        const newLimit = +e.target.value || 15;

        setLimit(newLimit);

        dispatch(getUsers({ limit: newLimit, role }));
    }

    return (
        <>
            <div className="mt-5 overflow-x-auto">
                {loading && <PageLoading />}
                {error && <PageError error={error.message} />}

                {(!data || !data?.users?.length) && (
                    <NoDataAvailable message="No users available." />
                )}

                {data?.users?.length > 0 && (
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="text-xs font-medium text-slate-400">
                                <th className="pb-3 pr-4">Info</th>
                                <th className="pb-3 pr-4">User ID</th>
                                <th className="pb-3 pr-4">Role</th>
                                <th className="pb-3 pr-4">Gender</th>
                                <th className="pb-3 pr-4">Registration Date</th>
                                <th className="pb-3 pr-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-t border-slate-50 text-sm hover:bg-violet-50"
                                >
                                    <td className="py-3 pr-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                name={
                                                    user.fullName || "Unknown"
                                                }
                                            />

                                            <div>
                                                <p className="font-semibold text-slate-800 capitalize">
                                                    {user.fullName || "Unknown"}
                                                </p>
                                                <p className="text-xs text-slate-400">
                                                    {user.email ||
                                                        "No email available"}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td
                                        className="py-3 pr-4 text-slate-600"
                                        title={user._id || "No ID available"}
                                    >
                                        {user._id.slice(0, 8)}...
                                    </td>

                                    <td className="py-3 pr-4">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                                                roleBadgeClasses[user.role]
                                            }`}
                                        >
                                            {user.role || "No role available"}
                                        </span>
                                    </td>

                                    <td className="py-3 pr-4 text-slate-600 capitalize">
                                        {user.gender || "No gender available"}
                                    </td>

                                    <td className="py-3 pr-4 text-slate-600">
                                        {user.createdAt.split("T")[0] ||
                                            "No registration date available"}
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
                <p className="text-slate-500">
                    Total Pages: {data?.totalPages || 0}
                </p>
                <div className="flex items-center gap-5">
                    <button
                        className={`rounded-lg px-3 py-1.5 ${
                            data?.currentPage === 1
                                ? "text-slate-300"
                                : "text-slate-600 hover:bg-slate-100"
                        }`}
                        disabled={data?.currentPage === 1}
                        onClick={() => handlePaginationActions("prev")}
                    >
                        Prev
                    </button>

                    <div className="flex items-center gap-1">
                        <button className="h-7 w-7 rounded-md bg-sky-100 font-medium text-sky-600">
                            {data?.currentPage || 1}
                        </button>
                    </div>

                    <button
                        className={`rounded-lg px-3 py-1.5 ${
                            data?.currentPage === data?.totalPages
                                ? "text-slate-300"
                                : "text-slate-600 hover:bg-slate-100"
                        }`}
                        disabled={data?.currentPage === data?.totalPages}
                        onClick={() => handlePaginationActions("next")}
                    >
                        Next
                    </button>
                </div>
                <div className="text-slate-500">
                    <span>Users per page:</span>
                    <select
                        name="usersPerPage"
                        id="usersPerPage"
                        onChange={handleChangeUserLimit}
                        // defaultValue={data?.usersPerPage || 15}
                        value={limit}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>
        </>
    );
}
