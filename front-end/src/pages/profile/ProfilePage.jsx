import { useSelector } from "react-redux";
import { Mail, Phone, Calendar } from "lucide-react";

import Avatar from "../../components/global/Avatar";
import PageLoading from "../../components/global/PageLoading";

const roleBadgeClasses = {
    admin: "bg-violet-100 text-violet-700",
    teacher: "bg-sky-100 text-sky-700",
    student: "bg-amber-100 text-amber-700",
    parent: "bg-emerald-100 text-emerald-700",
};

export default function ProfilePage() {
    const { user } = useSelector((state) => state.user);

    if (!user) {
        return <PageLoading />;
    }

    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="w-full mx-auto">
                <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 text-center shadow-sm sm:flex-row sm:items-center sm:text-left">
                    <Avatar name={user.fullName} size="lg" />

                    <div>
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                            <h1 className="text-xl font-bold text-slate-900">
                                {user.fullName}
                            </h1>

                            <span
                                className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                                    roleBadgeClasses[user.role]
                                }`}
                            >
                                {user.role}
                            </span>
                        </div>

                        <p className="mt-1 text-sm text-slate-500">
                            {user.email}
                        </p>
                    </div>
                </div>

                <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                    <h2 className="text-sm font-bold text-slate-900">
                        Account Information
                    </h2>

                    <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <p className="text-xs text-slate-400">Full Name</p>
                            <p className="font-semibold text-slate-800">
                                {user.fullName}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-400">Gender</p>
                            <p className="font-semibold capitalize text-slate-800">
                                {user.gender || "No gender available"}
                            </p>
                        </div>

                        <div>
                            <p className="flex items-center gap-1.5 text-xs text-slate-400">
                                <Mail className="h-3.5 w-3.5" />
                                Email
                            </p>
                            <p className="font-semibold text-slate-800">
                                {user.email}
                            </p>
                        </div>

                        <div>
                            <p className="flex items-center gap-1.5 text-xs text-slate-400">
                                <Phone className="h-3.5 w-3.5" />
                                Phone
                            </p>
                            <p className="font-semibold text-slate-800">
                                {user.phoneNumber || "No phone available"}
                            </p>
                        </div>

                        <div>
                            <p className="flex items-center gap-1.5 text-xs text-slate-400">
                                <Calendar className="h-3.5 w-3.5" />
                                Member Since
                            </p>
                            <p className="font-semibold text-slate-800">
                                {user.createdAt
                                    ? user.createdAt.split("T")[0]
                                    : "Unknown"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
