import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
    ChevronRight,
    Megaphone,
    Pencil,
    Trash2,
    Calendar,
} from "lucide-react";

import ConfirmModal from "../../components/global/ConfirmModal";
import UpdateAnnouncementModal from "../../components/announcements/UpdateAnnouncementModal";
import PageLoading from "../../components/global/PageLoading";
import PageError from "../../components/global/PageError";
import NoDataAvailable from "../../components/global/NoDataAvailable";
import { setErrorAlert, setSuccessAlert } from "../../store/slices/alert.slice";
import {
    getAnnouncementById,
    deleteAnnouncement,
    clearAnnouncementsDeleteAlerts,
} from "../../store/slices/announcements.slice";

export default function AnnouncementDetailsPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);
    const {
        data: announcement,
        loading,
        error,
    } = useSelector((state) => state.announcements.announcementDetails);
    const {
        message: deleteMessage,
        deleting,
        error: deleteError,
    } = useSelector((state) => state.announcements.deleteData);

    const isAdmin = user?.role === "admin";

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    useEffect(() => {
        dispatch(getAnnouncementById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (deleteMessage) {
            dispatch(setSuccessAlert(deleteMessage));
            dispatch(clearAnnouncementsDeleteAlerts());
            navigate("/announcements");
        }

        if (deleteError) {
            dispatch(setErrorAlert(deleteError.message));
            dispatch(clearAnnouncementsDeleteAlerts());
        }
    }, [deleteMessage, deleteError, dispatch, navigate]);

    function handleConfirmDelete() {
        dispatch(deleteAnnouncement(id));

        setIsDeleteOpen(false);
    }

    if (loading) {
        return <PageLoading />;
    }

    if (error) {
        return <PageError message={error.message} />;
    }

    if (!announcement) {
        return (
            <div className="min-h-screen w-full bg-slate-50 p-6">
                <NoDataAvailable message="No announcement found." />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="w-full mx-auto">
                <div className="mb-4 flex items-center gap-1 text-sm text-slate-500">
                    <Link
                        to="/announcements"
                        className="transition hover:text-slate-700"
                    >
                        Announcements
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="font-medium text-slate-700">
                        {announcement.title}
                    </span>
                </div>

                <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                            <Megaphone className="h-5 w-5" />
                        </span>

                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-xl font-bold text-slate-900">
                                    {announcement.title}
                                </h1>

                                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                    Published
                                </span>
                            </div>

                            <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
                                <Calendar className="h-3.5 w-3.5" />
                                {announcement.createdAt
                                    ? announcement.createdAt.split("T")[0]
                                    : "Unknown"}
                            </p>
                        </div>
                    </div>

                    {isAdmin && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsEditOpen(true)}
                                className="flex items-center gap-1.5 rounded-lg bg-teal-100 px-3 py-2 text-sm font-medium text-teal-700 transition hover:bg-teal-200 cursor-pointer"
                            >
                                <Pencil className="h-4 w-4" />
                                Edit
                            </button>

                            <button
                                onClick={() => setIsDeleteOpen(true)}
                                className="flex items-center gap-1.5 rounded-lg bg-violet-100 px-3 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-200 cursor-pointer"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </button>
                        </div>
                    )}
                </div>

                <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                    <h2 className="text-sm font-bold text-slate-900">
                        Description
                    </h2>

                    <p className="mt-3 whitespace-pre-wrap text-sm text-slate-600">
                        {announcement.description}
                    </p>
                </div>
            </div>

            {isAdmin && (
                <UpdateAnnouncementModal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    announcementToUpdate={announcement}
                    onUpdated={() => dispatch(getAnnouncementById(id))}
                />
            )}

            {isAdmin && (
                <ConfirmModal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    onConfirm={handleConfirmDelete}
                    title="Delete Announcement"
                    message={`Are you sure you want to delete "${announcement.title}"? This action cannot be undone.`}
                    confirmLabel="Delete"
                    loading={deleting}
                />
            )}
        </div>
    );
}
