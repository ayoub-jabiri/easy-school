import { Eye, Megaphone, Pencil, Trash2 } from "lucide-react";
import NoDataAvailable from "../global/NoDataAvailable";
import ConfirmModal from "../global/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    deleteAnnouncement,
    getAnnouncements,
    handleTableActions,
    clearAnnouncementsDeleteAlerts,
} from "../../store/slices/announcements.slice";
import { setErrorAlert, setSuccessAlert } from "../../store/slices/alert.slice";
import PageLoading from "../global/PageLoading";
import PageError from "../global/PageError";
import UpdateAnnouncementModal from "./UpdateAnnouncementModal";
import { Link } from "react-router";

export default function AnnouncementsTable() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const {
        data,
        loading,
        error,
        tableActions: { search, startDate, endDate, page, limit },
    } = useSelector((state) => state.announcements.announcementsList);
    const {
        message,
        deleting,
        error: deleteError,
    } = useSelector((state) => state.announcements.deleteData);

    const isAdmin = user?.role === "admin";

    // Handle Fetch Announcements
    useEffect(() => {
        dispatch(getAnnouncements({ search, startDate, endDate, page, limit }));
    }, [dispatch, search, startDate, endDate, page, limit]);

    function handlePaginationActions(action) {
        const value =
            action === "prev" ? data.currentPage - 1 : data.currentPage + 1;

        dispatch(handleTableActions({ key: "page", value }));
    }

    function handleChangeAnnouncementsLimit(e) {
        const newLimit = +e.target.value || 15;

        dispatch(handleTableActions({ key: "limit", value: newLimit }));
    }

    // Handle Delete Announcement
    const [announcementToDelete, setAnnouncementToDelete] = useState(null);

    useEffect(() => {
        if (message) {
            dispatch(setSuccessAlert(message));
            dispatch(clearAnnouncementsDeleteAlerts());
        }

        if (deleteError) {
            dispatch(setErrorAlert(deleteError.message));
            dispatch(clearAnnouncementsDeleteAlerts());
        }
    }, [message, deleteError, dispatch]);

    function handleConfirmDelete() {
        dispatch(deleteAnnouncement(announcementToDelete._id));

        setAnnouncementToDelete(null);
    }

    // Handle Update Announcement
    const [announcementToUpdate, setAnnouncementToUpdate] = useState(null);

    return (
        <>
            <div className="mt-5 overflow-x-auto">
                {loading && <PageLoading />}
                {error && <PageError message={error.message} />}

                {(!data || !data?.announcements?.length) && (
                    <NoDataAvailable message="No announcements available." />
                )}

                {data?.announcements?.length > 0 && (
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="text-xs font-medium text-slate-400">
                                <th className="pb-3 pr-4">Title</th>
                                <th className="pb-3 pr-4">Preview</th>
                                <th className="pb-3 pr-4">Date</th>
                                <th className="pb-3 pr-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.announcements.map((announcement) => (
                                <tr
                                    key={announcement._id}
                                    className="border-t border-slate-50 text-sm hover:bg-violet-50"
                                >
                                    <td className="py-3 pr-4">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                                                <Megaphone className="h-4 w-4" />
                                            </span>

                                            <p className="font-semibold text-slate-800">
                                                {announcement.title}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="max-w-xs truncate py-3 pr-4 text-slate-600">
                                        {announcement.description}
                                    </td>

                                    <td className="py-3 pr-4 text-slate-600">
                                        {announcement.createdAt
                                            ? announcement.createdAt.split(
                                                  "T"
                                              )[0]
                                            : "—"}
                                    </td>

                                    <td className="py-3 pr-4">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                to={`/announcements/${announcement._id}`}
                                                className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-600 transition hover:bg-sky-200 cursor-pointer"
                                            >
                                                <Eye className="h-3.5 w-3.5" />
                                            </Link>
                                            {isAdmin && (
                                                <>
                                                    <button
                                                        className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-100 text-teal-600 transition hover:bg-teal-200 cursor-pointer"
                                                        onClick={() =>
                                                            setAnnouncementToUpdate(
                                                                announcement
                                                            )
                                                        }
                                                        title="Update Announcement"
                                                    >
                                                        <Pencil className="h-3.5 w-3.5" />
                                                    </button>

                                                    <button
                                                        className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-600 transition hover:bg-violet-200 cursor-pointer"
                                                        onClick={() =>
                                                            setAnnouncementToDelete(
                                                                announcement
                                                            )
                                                        }
                                                        title="Delete Announcement"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="mt-5 flex items-center justify-between text-sm">
                <p className="text-slate-500">
                    Total Pages: {data?.totalPages || 0}
                </p>

                <div className="flex items-center gap-5">
                    <button
                        className={`rounded-lg px-3 py-1.5 ${
                            data?.currentPage === 1
                                ? "text-slate-300"
                                : "text-slate-600 hover:bg-slate-100"
                        }`}
                        disabled={data?.currentPage === 1}
                        onClick={() => handlePaginationActions("prev")}
                    >
                        Prev
                    </button>

                    <button className="h-7 w-7 rounded-md bg-sky-100 font-medium text-sky-600">
                        {data?.currentPage || 1}
                    </button>

                    <button
                        className={`rounded-lg px-3 py-1.5 ${
                            data?.currentPage === data?.totalPages
                                ? "text-slate-300"
                                : "text-slate-600 hover:bg-slate-100"
                        }`}
                        disabled={data?.currentPage === data?.totalPages}
                        onClick={() => handlePaginationActions("next")}
                    >
                        Next
                    </button>
                </div>

                <div className="text-slate-500">
                    <span>Announcements per page:</span>
                    <select
                        name="announcementsPerPage"
                        id="announcementsPerPage"
                        onChange={handleChangeAnnouncementsLimit}
                        value={limit}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>

            {isAdmin && (
                <UpdateAnnouncementModal
                    isOpen={!!announcementToUpdate}
                    onClose={() => setAnnouncementToUpdate(null)}
                    announcementToUpdate={announcementToUpdate}
                    onUpdated={() =>
                        dispatch(
                            getAnnouncements({
                                search,
                                startDate,
                                endDate,
                                page,
                                limit,
                            })
                        )
                    }
                />
            )}

            {isAdmin && (
                <ConfirmModal
                    isOpen={!!announcementToDelete}
                    onClose={() => setAnnouncementToDelete(null)}
                    onConfirm={handleConfirmDelete}
                    title="Delete Announcement"
                    message={`Are you sure you want to delete "${
                        announcementToDelete?.title || "this announcement"
                    }"? This action cannot be undone.`}
                    confirmLabel="Delete"
                    loading={deleting}
                />
            )}
        </>
    );
}
