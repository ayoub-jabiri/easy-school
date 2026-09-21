import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ChevronRight } from "lucide-react";

import ConfirmModal from "../../components/global/ConfirmModal";
import UpdateGradeModal from "../../components/grades/UpdateGradeModal";
import PageLoading from "../../components/global/PageLoading";
import PageError from "../../components/global/PageError";
import NoDataAvailable from "../../components/global/NoDataAvailable";
import GradeHeader from "../../components/grades/details/GradeHeader";
import { setErrorAlert, setSuccessAlert } from "../../store/slices/alert.slice";
import {
    getGradeById,
    deleteGrade,
    clearGradesDeleteAlerts,
} from "../../store/slices/grades.slice";
import GradeDetails from "../../components/grades/details/GradeDetails";

export default function GradeDetailsPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);
    const {
        data: grade,
        loading,
        error,
    } = useSelector((state) => state.grades.gradeDetails);
    const {
        message: deleteMessage,
        deleting,
        error: deleteError,
    } = useSelector((state) => state.grades.deleteData);

    const isTeacher = user?.role === "teacher";
    const isOwner = isTeacher && grade?.teacherId?._id === user?._id;

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    useEffect(() => {
        if (user?.role !== "parent") {
            dispatch(getGradeById(id));
        }
    }, [dispatch, id, user?.role]);

    useEffect(() => {
        if (deleteMessage) {
            dispatch(setSuccessAlert(deleteMessage));
            dispatch(clearGradesDeleteAlerts());
            navigate("/grades");
        }

        if (deleteError) {
            dispatch(setErrorAlert(deleteError.message));
            dispatch(clearGradesDeleteAlerts());
        }
    }, [deleteMessage, deleteError, dispatch, navigate]);

    function handleConfirmDelete() {
        dispatch(deleteGrade(id));

        setIsDeleteOpen(false);
    }

    if (user?.role === "parent") {
        return (
            <div className="min-h-screen w-full bg-slate-50 p-6">
                <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm">
                    <h1 className="text-lg font-bold text-slate-900">
                        Grade Details
                    </h1>
                    <p className="mt-4 text-sm text-slate-500">
                        The parent grades portal is coming in a future update.
                    </p>
                </div>
            </div>
        );
    }

    if (loading) {
        return <PageLoading />;
    }

    if (error) {
        return <PageError message={error.message} />;
    }

    if (!grade) {
        return (
            <div className="min-h-screen w-full bg-slate-50 p-6">
                <NoDataAvailable message="No grade found." />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="mx-auto max-w-4xl">
                <div className="mb-4 flex items-center gap-1 text-sm text-slate-500">
                    <Link
                        to="/grades"
                        className="transition hover:text-slate-700"
                    >
                        Grades
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="font-medium text-slate-700 capitalize">
                        {grade.evaluation}
                    </span>
                </div>

                <GradeHeader
                    grade={grade}
                    isOwner={isOwner}
                    onEdit={() => setIsEditOpen(true)}
                    onDelete={() => setIsDeleteOpen(true)}
                />

                <div className="mt-6">
                    <GradeDetails grade={grade} />
                </div>
            </div>

            {isOwner && (
                <UpdateGradeModal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    gradeToUpdate={grade}
                    onUpdated={() => dispatch(getGradeById(id))}
                />
            )}

            {isOwner && (
                <ConfirmModal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    onConfirm={handleConfirmDelete}
                    title="Delete Grade"
                    message={`Are you sure you want to delete this "${grade.evaluation}" grade? This action cannot be undone.`}
                    confirmLabel="Delete"
                    loading={deleting}
                />
            )}
        </div>
    );
}
