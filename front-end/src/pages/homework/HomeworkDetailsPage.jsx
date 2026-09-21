import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
    ChevronRight,
    Pencil,
    Trash2,
    Calendar,
    User,
    School,
} from "lucide-react";

import Modal from "../../components/global/Modal";
import ConfirmModal from "../../components/global/ConfirmModal";
import UpdateHomeworkForm from "../../components/homework/UpdateHomeworkForm";
import PageLoading from "../../components/global/PageLoading";
import PageError from "../../components/global/PageError";
import NoDataAvailable from "../../components/global/NoDataAvailable";
import { setErrorAlert, setSuccessAlert } from "../../store/slices/alert.slice";
import {
    getHomeworkById,
    deleteHomework,
    clearHomeworkDeleteAtlerts,
} from "../../store/slices/homework.slice";

export default function HomeworkDetailsPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);
    const {
        data: homework,
        loading,
        error,
    } = useSelector((state) => state.homework.homeworkDetails);
    const {
        message: deleteMessage,
        deleting,
        error: deleteError,
    } = useSelector((state) => state.homework.deleteData);

    const isTeacher = user?.role === "teacher";
    const isOwner = isTeacher && homework?.teacherId?._id === user?._id;

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    useEffect(() => {
        dispatch(getHomeworkById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (deleteMessage) {
            dispatch(setSuccessAlert(deleteMessage));
            dispatch(clearHomeworkDeleteAtlerts());
            navigate("/homework");
        }

        if (deleteError) {
            dispatch(setErrorAlert(deleteError.message));
            dispatch(clearHomeworkDeleteAtlerts());
        }
    }, [deleteMessage, deleteError, dispatch]);

    function handleConfirmDelete() {
        dispatch(deleteHomework(id));

        setIsDeleteOpen(false);
    }

    if (loading) {
        return <PageLoading />;
    }

    if (error) {
        return <PageError message={error.message} />;
    }

    if (!homework) {
        return (
            <div className="min-h-screen w-full bg-slate-50 p-6">
                <NoDataAvailable message="No homework found." />
            </div>
        );
    }

    const isExpired = new Date(homework.dueDate) <= new Date();

    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="mx-auto max-w-4xl">
                <div className="mb-4 flex items-center gap-1 text-sm text-slate-500">
                    <Link
                        to="/homework"
                        className="transition hover:text-slate-700"
                    >
                        Homework
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="font-medium text-slate-700">
                        {homework.title}
                    </span>
                </div>

                <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-xl font-bold text-slate-900">
                                {homework.title}
                            </h1>

                            <span
                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                    isExpired
                                        ? "bg-red-100 text-red-700"
                                        : "bg-emerald-100 text-emerald-700"
                                }`}
                            >
                                {isExpired ? "Expired" : "Active"}
                            </span>
                        </div>

                        <p className="mt-1 text-sm font-medium capitalize text-sky-600">
                            {homework.classId?.subjectId?.title} —{" "}
                            {homework.classId?.level} Year{" "}
                            {homework.classId?.levelYear} (Group{" "}
                            {homework.classId?.group})
                        </p>
                    </div>

                    {isOwner && (
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

                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div className="rounded-2xl bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-2 text-slate-400">
                            <User className="h-4 w-4" />
                            <p className="text-xs">Teacher</p>
                        </div>
                        <p className="mt-1 font-semibold text-slate-800">
                            {homework.teacherId?.fullName || "Unknown"}
                        </p>
                        <p className="text-xs text-slate-400">
                            {homework.teacherId?.email || "No email available"}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Calendar className="h-4 w-4" />
                            <p className="text-xs">Assigned On</p>
                        </div>
                        <p className="mt-1 font-semibold text-slate-800">
                            {homework.createdAt
                                ? homework.createdAt.split("T")[0]
                                : "Unknown"}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-2 text-slate-400">
                            <School className="h-4 w-4" />
                            <p className="text-xs">Due Date</p>
                        </div>
                        <p
                            className={`mt-1 font-semibold ${
                                isExpired ? "text-red-600" : "text-slate-800"
                            }`}
                        >
                            {homework.dueDate
                                ? homework.dueDate.split("T")[0]
                                : "Unknown"}
                        </p>
                    </div>
                </div>

                <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                    <h2 className="text-sm font-bold text-slate-900">
                        Description
                    </h2>

                    <p className="mt-3 whitespace-pre-wrap text-sm text-slate-600">
                        {homework.description}
                    </p>
                </div>
            </div>

            {isOwner && (
                <Modal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    title="Update Homework"
                >
                    <UpdateHomeworkForm
                        onClose={() => setIsEditOpen(false)}
                        homeworkToUpdate={homework}
                        onUpdated={() => dispatch(getHomeworkById(id))}
                    />
                </Modal>
            )}

            {isOwner && (
                <ConfirmModal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    onConfirm={handleConfirmDelete}
                    title="Delete Homework"
                    message={`Are you sure you want to delete "${homework.title}"? This action cannot be undone.`}
                    confirmLabel="Delete"
                    loading={deleting}
                />
            )}
        </div>
    );
}
