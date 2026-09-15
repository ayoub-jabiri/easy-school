import Schedule from "../../components/dashboard/student/Schedule";
import CardsList from "../../components/dashboard/student/CardsList";
import LatestAnnouncements from "../../components/dashboard/LatestAnnouncements";
import LatestGrades from "../../components/dashboard/LatestGardes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import PageLoading from "../../components/global/PageLoading";
import PageError from "../../components/global/PageError";
import NoDataAvailable from "../../components/global/NoDataAvailable";
import { getStudentDashboard } from "../../store/slices/dashboard.slice";

export default function StudentDashboard() {
    const { studentDashboardData, loading, error } = useSelector(
        (state) => state.dashboard
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStudentDashboard());
    }, [dispatch]);

    if (loading) {
        return <PageLoading />;
    }

    if (error) {
        return <PageError message={error.message} />;
    }

    if (!studentDashboardData) {
        return (
            <div className="h-100">
                <NoDataAvailable message="No data available for the student dashboard." />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="grid grid-cols-12 gap-6 mx-auto max-w-full">
                <CardsList stats={studentDashboardData.stats} />

                <div className="col-span-12 xl:col-span-9 flex flex-col gap-6">
                    <Schedule />
                </div>

                <div className="col-span-12 xl:col-span-3 flex flex-col gap-6">
                    <LatestAnnouncements
                        data={studentDashboardData.recentAnnouncements}
                    />

                    <LatestGrades data={studentDashboardData.recentGrades} />
                </div>
            </div>
        </div>
    );
}
