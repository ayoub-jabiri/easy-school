import { useSelector } from "react-redux";

import AnnouncementsTable from "../../components/announcements/AnnouncementsTable";
import TableActions from "../../components/announcements/TableActions";

export default function AnnouncementsPage() {
    const { data } = useSelector(
        (state) => state.announcements.announcementsList
    );

    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="mx-auto max-w-full rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-lg font-bold text-slate-900">
                        Announcements ({data?.totalAnnouncements || 0})
                    </h1>

                    <TableActions />
                </div>

                <AnnouncementsTable />
            </div>
        </div>
    );
}
