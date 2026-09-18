import ClassesTable from "../../components/classes/ClassesTable";
import TableActions from "../../components/classes/TableActions";

import { useSelector } from "react-redux";

export default function ClassesPage() {
    const { data } = useSelector((state) => state.classes.classesList);

    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="mx-auto max-w-full rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-lg font-bold text-slate-900">
                        All Classes ({data?.totalClasses || 0})
                    </h1>

                    <TableActions />
                </div>

                <ClassesTable />
            </div>
        </div>
    );
}
