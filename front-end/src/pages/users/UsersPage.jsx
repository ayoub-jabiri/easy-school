import UsersTable from "../../components/users/UsersTable";
import TableActions from "../../components/users/TableActions";

import { useSelector } from "react-redux";

export default function UsersPage() {
    const { data } = useSelector((state) => state.users.usersList);

    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="mx-auto max-w-full rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-lg font-bold text-slate-900">
                        All Users ({data?.users?.length || 0})
                    </h1>

                    <TableActions />
                </div>

                <UsersTable />
            </div>
        </div>
    );
}
