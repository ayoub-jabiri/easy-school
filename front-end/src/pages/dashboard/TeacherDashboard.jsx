import CardsList from "../../components/dashboard/teacher/CardsList";
import ClassesTable from "../../components/dashboard/teacher/ClassesTable";
import Schedule from "../../components/dashboard/student/Schedule";
import LatestAnnouncements from "../../components/dashboard/admin/LatestAnnouncements";
import LatestGrades from "../../components/dashboard/admin/LatestGardes";

export default function TeacherDashboard() {
    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="grid grid-cols-12 gap-6 mx-auto max-w-full">
                <CardsList />

                <div className="col-span-12 xl:col-span-9 flex flex-col gap-6">
                    <Schedule />

                    <ClassesTable />
                </div>

                <div className="col-span-12 xl:col-span-3 flex flex-col gap-6">
                    <LatestAnnouncements />

                    <LatestGrades />
                </div>
            </div>
        </div>
    );
}
