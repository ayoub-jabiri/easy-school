import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CardsList from "../../components/dashboard/parent/CardsList";
import LatestAnnouncements from "../../components/dashboard/LatestAnnouncements";
import LatestGrades from "../../components/dashboard/LatestGardes";
import PageLoading from "../../components/global/PageLoading";
import PageError from "../../components/global/PageError";
import NoDataAvailable from "../../components/global/NoDataAvailable";
import { getParentDashboard } from "../../store/slices/dashboard.slice";
import ChildrenTable from "../../components/dashboard/parent/ChildrenTable";

export default function ParentDashboard() {
    const { parentDashboardData, loading, error } = useSelector(
        (state) => state.dashboard
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getParentDashboard());
    }, [dispatch]);

    if (loading) {
        return <PageLoading />;
    }

    if (error) {
        return <PageError message={error.message} />;
    }

    if (!parentDashboardData) {
        return (
            <div className="h-100">
                <NoDataAvailable message="No data available for the parent dashboard." />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="mx-auto grid max-w-full grid-cols-12 gap-6">
                <CardsList stats={parentDashboardData.stats} />

                <div className="col-span-12 flex flex-col gap-6 xl:col-span-8">
                    <ChildrenTable data={parentDashboardData.children} />
                </div>

                <div className="col-span-12 flex flex-col gap-6 xl:col-span-4">
                    <LatestAnnouncements
                        data={parentDashboardData.recentAnnouncements}
                    />

                    <LatestGrades data={parentDashboardData.recentGrades} />
                </div>
            </div>
        </div>
    );
}
