import { Eye, Pencil, Trash2 } from "lucide-react";
import NoDataAvailable from "../global/NoDataAvailable";
import ConfirmModal from "../global/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    deleteGrade,
    getGrades,
    handleTableActions,
    clearGradesDeleteAlerts,
} from "../../store/slices/grades.slice";
import { setErrorAlert, setSuccessAlert } from "../../store/slices/alert.slice";
import PageLoading from "../global/PageLoading";
import PageError from "../global/PageError";
import UpdateGradeModal from "./UpdateGradeModal";
import { Link } from "react-router";

function gradeBadgeStyle(score) {
    if (score >= 14) return "bg-emerald-100 text-emerald-700";
    if (score >= 10) return "bg-amber-100 text-amber-700";
    return "bg-red-100 text-red-700";
}

export default function GradesTable() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const {
        data,
        loading,
        error,
        tableActions: { search, classId, studentId, subjectId, page, limit },
    } = useSelector((state) => state.grades.gradesList);
    const {
        message,
        deleting,
        error: deleteError,
    } = useSelector((state) => state.grades.deleteData);

    const isTeacher = user?.role === "teacher";

    // Handle Fetch Grades
    useEffect(() => {
        dispatch(
            getGrades({ search, classId, studentId, subjectId, page, limit })
        );
    }, [dispatch, search, classId, studentId, subjectId, page, limit]);

    function handlePaginationActions(action) {
        const value =
            action === "prev" ? data.currentPage - 1 : data.currentPage + 1;

        dispatch(handleTableActions({ key: "page", value }));
    }

    function handleChangeGradesLimit(e) {
        const newLimit = +e.target.value || 15;

        dispatch(handleTableActions({ key: "limit", value: newLimit }));
    }

    // Handle Delete Grade
    const [gradeToDelete, setGradeToDelete] = useState(null);

    useEffect(() => {
        if (message) {
            dispatch(setSuccessAlert(message));
            dispatch(clearGradesDeleteAlerts());
        }

        if (deleteError) {
            dispatch(setErrorAlert(deleteError.message));
            dispatch(clearGradesDeleteAlerts());
        }
    }, [message, deleteError, dispatch]);

    function handleConfirmDelete() {
        dispatch(deleteGrade(gradeToDelete._id));

        setGradeToDelete(null);
    }

    // Handle Update Grade
    const [gradeToUpdate, setGradeToUpdate] = useState(null);

    return (
        <>
            <div className="mt-5 overflow-x-auto">
                {loading && <PageLoading />}
                {error && <PageError message={error.message} />}

                {(!data || !data?.grades?.length) && (
                    <NoDataAvailable message="No grades available." />
                )}

                {data?.grades?.length > 0 && (
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="text-xs font-medium text-slate-400">
                                <th className="pb-3 pr-4">Student</th>
                                <th className="pb-3 pr-4">Class / Subject</th>
                                <th className="pb-3 pr-4">Evaluation</th>
                                <th className="pb-3 pr-4">Grade</th>
                                <th className="pb-3 pr-4">Date</th>
                                <th className="pb-3 pr-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.grades.map((grade) => (
                                <tr
                                    key={grade._id}
                                    className="border-t border-slate-50 text-sm hover:bg-violet-50"
                                >
                                    <td className="py-3 pr-4 font-semibold text-slate-800 capitalize">
                                        {grade.studentId?.fullName || "—"}
                                    </td>

                                    <td className="py-3 pr-4 text-slate-600 capitalize">
                                        {grade.classId?.subjectId?.title || "—"}{" "}
                                        ({grade.classId?.level} Year{" "}
                                        {grade.classId?.levelYear}, Group{" "}
                                        {grade.classId?.group})
                                    </td>

                                    <td className="py-3 pr-4 text-slate-600 capitalize">
                                        {grade.evaluation}
                                    </td>

                                    <td className="py-3 pr-4">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${gradeBadgeStyle(
                                                grade.grade
                                            )}`}
                                        >
                                            {grade.grade} / 20
                                        </span>
                                    </td>

                                    <td className="py-3 pr-4 text-slate-600">
                                        {grade.createdAt
                                            ? grade.createdAt.split("T")[0]
                                            : "—"}
                                    </td>

                                    <td className="py-3 pr-4">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                to={`/homework/${grade._id}`}
                                                className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-600 transition hover:bg-sky-200 cursor-pointer"
                                            >
                                                <Eye className="h-3.5 w-3.5" />
                                            </Link>
                                            {isTeacher && (
                                                <>
                                                    <button
                                                        className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-100 text-teal-600 transition hover:bg-teal-200 cursor-pointer"
                                                        onClick={() =>
                                                            setGradeToUpdate(
                                                                grade
                                                            )
                                                        }
                                                        title="Update Grade"
                                                    >
                                                        <Pencil className="h-3.5 w-3.5" />
                                                    </button>

                                                    <button
                                                        className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-600 transition hover:bg-violet-200 cursor-pointer"
                                                        onClick={() =>
                                                            setGradeToDelete(
                                                                grade
                                                            )
                                                        }
                                                        title="Delete Grade"
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
                    <span>Grades per page:</span>
                    <select
                        name="gradesPerPage"
                        id="gradesPerPage"
                        onChange={handleChangeGradesLimit}
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

            {isTeacher && (
                <UpdateGradeModal
                    isOpen={!!gradeToUpdate}
                    onClose={() => setGradeToUpdate(null)}
                    gradeToUpdate={gradeToUpdate}
                    onUpdated={() =>
                        dispatch(
                            getGrades({
                                search,
                                classId,
                                studentId,
                                subjectId,
                                page,
                                limit,
                            })
                        )
                    }
                />
            )}

            {isTeacher && (
                <ConfirmModal
                    isOpen={!!gradeToDelete}
                    onClose={() => setGradeToDelete(null)}
                    onConfirm={handleConfirmDelete}
                    title="Delete Grade"
                    message="Are you sure you want to delete this grade? This action cannot be undone."
                    confirmLabel="Delete"
                    loading={deleting}
                />
            )}
        </>
    );
}
