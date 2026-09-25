import { useSelector } from "react-redux";

import GradesTable from "../../components/grades/GradesTable";
import TableActions from "../../components/grades/TableActions";

export default function GradesPage() {
    const { data } = useSelector((state) => state.grades.gradesList);

    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="mx-auto max-w-full rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-lg font-bold text-slate-900">
                        Grades ({data?.totalGrades || 0})
                    </h1>

                    <TableActions />
                </div>

                <GradesTable />
            </div>
        </div>
    );
}
