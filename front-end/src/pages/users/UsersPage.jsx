import UsersTable from "../../components/users/UsersTable";
import TableActions from "../../components/users/TableActions";

import { useSelector } from "react-redux";
import { useState } from "react";

export default function UsersPage() {
    const { data } = useSelector((state) => state.users.users);

    const [targetedRole, setTargetedRole] = useState("");
    const [limit, setLimit] = useState(data?.usersPerPage || 15);

    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="mx-auto max-w-full rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-lg font-bold text-slate-900">
                        All Users ({data?.totalUsers || 0})
                    </h1>

                    <TableActions
                        targetedRole={targetedRole}
                        setTargetedRole={setTargetedRole}
                        limit={limit}
                    />
                </div>

                <UsersTable
                    data={data}
                    role={targetedRole}
                    limit={limit}
                    setLimit={setLimit}
                />
            </div>
        </div>
    );
}
