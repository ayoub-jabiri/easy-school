import CardsList from "../../components/dashboard/teacher/CardsList";
import ClassesTable from "../../components/dashboard/teacher/ClassesTable";
import Schedule from "../../components/dashboard/student/Schedule";
import LatestAnnouncements from "../../components/dashboard/LatestAnnouncements";
import LatestGrades from "../../components/dashboard/LatestGardes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import PageLoading from "../../components/global/PageLoading";
import PageError from "../../components/global/PageError";
import NoDataAvailable from "../../components/global/NoDataAvailable";
import { getTeacherDashboard } from "../../store/slices/dashboard.slice";

export default function TeacherDashboard() {
    const { teacherDashboardData, loading, error } = useSelector(
        (state) => state.dashboard
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTeacherDashboard());
    }, [dispatch]);

    if (loading) {
        return <PageLoading />;
    }

    if (error) {
        return <PageError message={error.message} />;
    }

    if (!teacherDashboardData) {
        return (
            <div className="h-100">
                <NoDataAvailable message="No data available for the teacher dashboard." />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="grid grid-cols-12 gap-6 mx-auto max-w-full">
                <CardsList stats={teacherDashboardData.stats} />

                <div className="col-span-12 xl:col-span-9 flex flex-col gap-6">
                    <Schedule />

                    <ClassesTable data={teacherDashboardData.teacherClasses} />
                </div>

                <div className="col-span-12 xl:col-span-3 flex flex-col gap-6">
                    <LatestAnnouncements
                        data={teacherDashboardData.recentAnnouncements}
                    />

                    <LatestGrades data={teacherDashboardData.recentGrades} />
                </div>
            </div>
        </div>
    );
}
