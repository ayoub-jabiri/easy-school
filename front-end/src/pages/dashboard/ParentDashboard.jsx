import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CardsList from "../../components/dashboard/parent/CardsList";
import LatestAnnouncements from "../../components/dashboard/LatestAnnouncements";
import LatestGrades from "../../components/dashboard/LatestGardes";
import ParentSchedule from "../../components/parent/ParentSchedule";
import PageLoading from "../../components/global/PageLoading";
import PageError from "../../components/global/PageError";
import NoDataAvailable from "../../components/global/NoDataAvailable";
import { getParentDashboard } from "../../store/slices/dashboard.slice";

const children = [
    { id: 1, name: "Amina Benali", className: "4A" },
    { id: 2, name: "Karim Benali", className: "5A" },
];

const schedules = {
    1: {
        className: "4A",
        dates: "August 19 – 23",
        scheduleData: [
            {
                time: "8:00 AM",
                endTime: "8:45 AM",
                slots: {
                    Mon: { subject: "Math", color: "sky" },
                    Wed: { subject: "Math", color: "sky" },
                    Fri: { subject: "Math", color: "amber" },
                },
            },
            {
                time: "9:00 AM",
                endTime: "9:45 AM",
                slots: {
                    Mon: { subject: "English", color: "sky" },
                    Tue: { subject: "English", color: "sky" },
                    Thu: { subject: "English", color: "sky" },
                    Fri: { subject: "English", color: "amber" },
                },
            },
            {
                time: "10:00 AM",
                endTime: "10:45 AM",
                slots: {
                    Mon: { subject: "Biology", color: "sky" },
                    Tue: { subject: "English", color: "amber" },
                    Wed: { subject: "Music", color: "sky" },
                    Thu: { subject: "Biology", color: "amber" },
                },
            },
            {
                time: "11:00 AM",
                endTime: "11:45 AM",
                slots: {
                    Mon: { subject: "Physics", color: "sky" },
                    Tue: { subject: "History", color: "violet" },
                    Thu: { subject: "Physics", color: "sky" },
                    Fri: { subject: "Music", color: "sky" },
                },
            },
            {
                time: "1:00 PM",
                endTime: "1:45 PM",
                slots: {
                    Mon: { subject: "Chemistry", color: "sky" },
                    Wed: { subject: "Chemistry", color: "sky" },
                    Fri: { subject: "Chemistry", color: "sky" },
                },
            },
            {
                time: "2:00 PM",
                endTime: "2:45 PM",
                slots: {
                    Mon: { subject: "History", color: "amber" },
                    Tue: { subject: "Geography", color: "sky" },
                    Wed: { subject: "Physics", color: "sky" },
                    Thu: { subject: "History", color: "sky" },
                },
            },
        ],
    },

    2: {
        className: "5A",
        dates: "August 19 – 23",
        scheduleData: [
            {
                time: "8:00 AM",
                endTime: "8:45 AM",
                slots: {
                    Mon: { subject: "Physics", color: "sky" },
                    Tue: { subject: "Math", color: "amber" },
                    Thu: { subject: "Physics", color: "sky" },
                },
            },
            {
                time: "9:00 AM",
                endTime: "9:45 AM",
                slots: {
                    Mon: { subject: "French", color: "sky" },
                    Wed: { subject: "French", color: "sky" },
                    Fri: { subject: "French", color: "amber" },
                },
            },
            {
                time: "10:00 AM",
                endTime: "10:45 AM",
                slots: {
                    Tue: { subject: "History", color: "violet" },
                    Wed: { subject: "Biology", color: "sky" },
                    Thu: { subject: "Math", color: "sky" },
                },
            },
            {
                time: "11:00 AM",
                endTime: "11:45 AM",
                slots: {
                    Mon: { subject: "English", color: "sky" },
                    Tue: { subject: "Geography", color: "amber" },
                    Fri: { subject: "English", color: "sky" },
                },
            },
            {
                time: "1:00 PM",
                endTime: "1:45 PM",
                slots: {
                    Mon: { subject: "Chemistry", color: "sky" },
                    Wed: { subject: "Chemistry", color: "sky" },
                    Thu: { subject: "Chemistry", color: "amber" },
                },
            },
            {
                time: "2:00 PM",
                endTime: "2:45 PM",
                slots: {
                    Tue: { subject: "Music", color: "violet" },
                    Wed: { subject: "Physics", color: "sky" },
                    Fri: { subject: "History", color: "sky" },
                },
            },
        ],
    },
};

export default function ParentDashboard() {
    const [selectedChildId, setSelectedChildId] = useState(children[0].id);

    const { parentDashboardData, loading, error } = useSelector(
        (state) => state.dashboard
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getParentDashboard());
    }, [dispatch]);

    const selectedChild = children.find(
        (child) => child.id === Number(selectedChildId)
    );

    const selectedSchedule = schedules[selectedChildId];

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

                <div className="col-span-12 flex flex-col gap-6 xl:col-span-9">
                    <ParentSchedule
                        child={selectedChild}
                        schedule={selectedSchedule}
                        selectedChildId={selectedChildId}
                        onChildChange={setSelectedChildId}
                        children={children}
                    />
                </div>

                <div className="col-span-12 flex flex-col gap-6 xl:col-span-3">
                    <LatestAnnouncements
                        data={parentDashboardData.recentAnnouncements}
                    />

                    <LatestGrades data={parentDashboardData.recentGrades} />
                </div>
            </div>
        </div>
    );
}
