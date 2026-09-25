import LatestRegisteredStudents from "../../components/dashboard/admin/LatestRegisteredStudents";
import CardsList from "../../components/dashboard/admin/CardsList";
import Charts from "../../components/dashboard/admin/Charts";
import LatestAnnouncements from "../../components/dashboard/LatestAnnouncements";
import LatestGrades from "../../components/dashboard/LatestGardes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import PageLoading from "../../components/global/PageLoading";
import PageError from "../../components/global/PageError";
import { getAdminDashboard } from "../../store/slices/dashboard.slice";
import NoDataAvailable from "../../components/global/NoDataAvailable";

export default function AdminDashboard() {
    const { adminDashboardData, loading, error } = useSelector(
        (state) => state.dashboard
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAdminDashboard());
    }, [dispatch]);

    if (loading) {
        return <PageLoading />;
    }

    if (error) {
        return <PageError message={error.message} />;
    }

    if (!adminDashboardData) {
        return (
            <div className="h-100">
                <NoDataAvailable message="No data available for the admin dashboard." />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="grid grid-cols-12 gap-6 mx-auto max-w-full">
                <CardsList data={adminDashboardData.overview} />
                <div className="col-span-12 xl:col-span-8 flex flex-col gap-6">
                    <Charts data={adminDashboardData.overview} />

                    <LatestRegisteredStudents
                        data={adminDashboardData.latestRegisteredStudents}
                    />
                </div>

                <div className="col-span-12 xl:col-span-4 flex flex-col gap-6">
                    <LatestAnnouncements
                        data={adminDashboardData.recentAnnouncements}
                    />

                    <LatestGrades data={adminDashboardData.recentGrades} />
                </div>
            </div>
        </div>
    );
}
