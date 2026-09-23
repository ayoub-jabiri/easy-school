import SubjectsTable from "../../components/subjects/SubjectsTable";
import TableActions from "../../components/subjects/TableActions";

import { useSelector } from "react-redux";

export default function SubjectsPage() {
    const { data } = useSelector((state) => state.subjects.subjectsList);
    const { user } = useSelector((state) => state.user);

    const isAdmin = user?.role === "admin";

    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="mx-auto max-w-full rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-lg font-bold text-slate-900">
                        All Subjects ({data?.subjects?.length || 0})
                    </h1>

                    <TableActions isAdmin={isAdmin} />
                </div>

                <SubjectsTable isAdmin={isAdmin} />
            </div>
        </div>
    );
}
