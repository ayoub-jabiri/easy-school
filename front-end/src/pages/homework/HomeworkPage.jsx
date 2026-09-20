import HomeworkTable from "../../components/homework/HomeworkTable";
import TableActions from "../../components/homework/TableActions";

import { useSelector } from "react-redux";

export default function HomeworkPage() {
    const { data } = useSelector((state) => state.homework.homeworksList);

    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="mx-auto max-w-full rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-lg font-bold text-slate-900">
                        Homework ({data?.totalHomeworks || 0})
                    </h1>

                    <TableActions />
                </div>

                <HomeworkTable />
            </div>
        </div>
    );
}
