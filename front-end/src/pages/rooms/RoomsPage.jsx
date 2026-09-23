import RoomsTable from "../../components/rooms/RoomsTable";
import TableActions from "../../components/rooms/TableActions";

import { useSelector } from "react-redux";

export default function RoomsPage() {
    const { data } = useSelector((state) => state.rooms.roomsList);

    const { user } = useSelector((state) => state.user);

    const isAdmin = user?.role === "admin";

    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="mx-auto max-w-full rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-lg font-bold text-slate-900">
                        All School Rooms ({data?.rooms?.length || 0})
                    </h1>

                    <TableActions isAdmin={isAdmin} />
                </div>

                <RoomsTable isAdmin={isAdmin} />
            </div>
        </div>
    );
}
