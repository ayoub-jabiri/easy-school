import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ChevronRight, Pencil } from "lucide-react";

import Avatar from "../../components/global/Avatar";
import Modal from "../../components/global/Modal";
import UpdateUserForm from "../../components/users/UpdateUserForm";
import PageLoading from "../../components/global/PageLoading";
import PageError from "../../components/global/PageError";
import NoDataAvailable from "../../components/global/NoDataAvailable";
import { getUserById } from "../../store/slices/users.slice";

const roleBadgeClasses = {
    admin: "bg-violet-100 text-violet-700",
    teacher: "bg-sky-100 text-sky-700",
    student: "bg-amber-100 text-amber-700",
    parent: "bg-emerald-100 text-emerald-700",
};

export default function UserDetailsPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const {
        data: user,
        loading,
        error,
    } = useSelector((state) => state.users.userDetails);

    const [isEditOpen, setIsEditOpen] = useState(false);

    useEffect(() => {
        dispatch(getUserById(id));
    }, [dispatch, id]);

    if (loading) {
        return <PageLoading />;
    }

    if (error) {
        return <PageError message={error.message} />;
    }

    if (!user) {
        return (
            <div className="min-h-screen w-full bg-slate-50 p-6">
                <NoDataAvailable message="No user found." />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="mx-auto max-w-5xl">
                <div className="mb-4 flex items-center gap-1 text-sm text-slate-500">
                    <Link
                        to="/users"
                        className="transition hover:text-slate-700"
                    >
                        Users
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="font-medium text-slate-700">
                        {user.fullName}
                    </span>
                </div>

                <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar name={user.fullName} size="lg" />

                        <div>
                            <h1 className="text-xl font-bold text-slate-900">
                                {user.fullName}
                            </h1>
                            <p className="text-sm font-medium capitalize text-sky-600">
                                {user.role}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:flex sm:gap-10">
                        <div>
                            <p className="text-xs text-slate-400">User ID</p>
                            <p
                                className="font-semibold text-slate-700"
                                title={user._id}
                            >
                                {user._id.slice(0, 8)}...
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-400">
                                Phone Number
                            </p>
                            <p className="font-semibold text-slate-700">
                                {user.phoneNumber || "No phone available"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-400">
                                Registered On
                            </p>
                            <p className="font-semibold text-slate-700">
                                {user.createdAt
                                    ? user.createdAt.split("T")[0]
                                    : "Unknown"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-400">Email</p>
                            <p className="font-semibold text-slate-700">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h2 className="text-sm font-bold text-slate-900">
                                Personal Information
                            </h2>

                            <button
                                onClick={() => setIsEditOpen(true)}
                                className="text-slate-400 transition hover:text-slate-600 cursor-pointer"
                                title="Edit personal information"
                            >
                                <Pencil className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-y-5 text-sm">
                            <div>
                                <p className="text-xs text-slate-400">
                                    Full Name
                                </p>
                                <p className="font-semibold text-slate-700">
                                    {user.fullName}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">Gender</p>
                                <p className="font-semibold capitalize text-slate-700">
                                    {user.gender || "No gender available"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">Email</p>
                                <p className="font-semibold text-slate-700">
                                    {user.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">Phone</p>
                                <p className="font-semibold text-slate-700">
                                    {user.phoneNumber || "No phone available"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h2 className="text-sm font-bold text-slate-900">
                                Account Information
                            </h2>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-y-5 text-sm">
                            <div>
                                <p className="text-xs text-slate-400">Role</p>
                                <span
                                    className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                                        roleBadgeClasses[user.role]
                                    }`}
                                >
                                    {user.role}
                                </span>
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">
                                    User ID
                                </p>
                                <p
                                    className="font-semibold text-slate-700"
                                    title={user._id}
                                >
                                    {user._id}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">
                                    Registered On
                                </p>
                                <p className="font-semibold text-slate-700">
                                    {user.createdAt
                                        ? user.createdAt.split("T")[0]
                                        : "Unknown"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isEditOpen && (
                <Modal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    title="Update User"
                >
                    <UpdateUserForm
                        onClose={() => setIsEditOpen(false)}
                        userToUpdate={user}
                    />
                </Modal>
            )}
        </div>
    );
}
