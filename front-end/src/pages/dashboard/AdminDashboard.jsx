import StartStudentsTable from "../../components/dashboard/admin/StartStudentsTable";
import CardsList from "../../components/dashboard/admin/CardsList";
import Charts from "../../components/dashboard/admin/Charts";
import LatestAnnouncements from "../../components/dashboard/admin/LatestAnnouncements";
import LatestGrades from "../../components/dashboard/admin/LatestGardes";

export default function AdminDashboard() {
    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="grid grid-cols-12 gap-6 mx-auto max-w-full">
                <CardsList />
                <div className="col-span-12 xl:col-span-9 flex flex-col gap-6">
                    <Charts />

                    <StartStudentsTable />
                </div>

                <div className="col-span-12 xl:col-span-3 flex flex-col gap-6">
                    <LatestAnnouncements />

                    <LatestGrades />
                </div>
            </div>
        </div>
    );
}
