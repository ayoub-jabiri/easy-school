import Schedule from "../../components/dashboard/student/Schedule";
import LatestAnnouncements from "../../components/dashboard/LatestAnnouncements";
import LatestGrades from "../../components/dashboard/LatestGardes";

export default function StudentDashboard() {
    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="grid grid-cols-12 gap-6 mx-auto max-w-full">
                <div className="col-span-12 xl:col-span-9 flex flex-col gap-6">
                    <Schedule />
                </div>

                <div className="col-span-12 xl:col-span-3 flex flex-col gap-6">
                    <LatestAnnouncements />

                    <LatestGrades />
                </div>
            </div>
        </div>
    );
}
