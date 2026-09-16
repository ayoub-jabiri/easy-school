import UsersTable from "../../components/users/UsersTable";
import TableActions from "../../components/users/TableActions";

export default function UsersPage() {
    const users = [
        {
            id: "7419380756",
            fullName: "John Doe",
            email: "john@doe.com",
            role: "teacher",
            phone: "7283941",
            address: "512 Main St, Anytown, USA",
        },
        {
            id: "2304567890",
            fullName: "Dean Guerrero",
            email: "elmer@doe.com",
            role: "teacher",
            phone: "8027856",
            address: "597 Main St, Anytown, USA",
        },
        {
            id: "5534567890",
            fullName: "Mike Geller",
            email: "mike@geller.com",
            role: "student",
            phone: "2744534",
            address: "841 Main St, Anytown, USA",
        },
        {
            id: "7844567890",
            fullName: "Jay French",
            email: "jay@gmail.com",
            role: "parent",
            phone: "5481430",
            address: "997 Main St, Anytown, USA",
        },
        {
            id: "1254567890",
            fullName: "Jane Smith",
            email: "jane@gmail.com",
            role: "admin",
            phone: "7401901",
            address: "209 Main St, Anytown, USA",
        },
    ];

    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="mx-auto max-w-full rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-lg font-bold text-slate-900">
                        All Users
                    </h1>

                    <TableActions />
                </div>

                <UsersTable users={users} />
            </div>
        </div>
    );
}
