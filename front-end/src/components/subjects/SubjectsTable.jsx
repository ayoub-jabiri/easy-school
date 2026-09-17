import { BookOpen, Pencil, Trash2 } from "lucide-react";
import NoDataAvailable from "../global/NoDataAvailable";
import ConfirmModal from "../global/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    deleteSubject,
    clearSubjectDeleteError,
    clearSubjectDeleteMessage,
    getSubjects,
    handleTableActions,
} from "../../store/slices/subjects.slice";
import { setErrorAlert, setSuccessAlert } from "../../store/slices/alert.slice";
import PageLoading from "../global/PageLoading";
import PageError from "../global/PageError";
import Modal from "../global/Modal";
import UpdateSubjectForm from "./UpdateSubjectForm";

export default function SubjectsTable() {
    const dispatch = useDispatch();
    const {
        data,
        loading,
        error,
        tableActions: { search, page, limit },
    } = useSelector((state) => state.subjects.subjectsList);
    const {
        message,
        deleting,
        error: deleteError,
    } = useSelector((state) => state.subjects.deleteData);

    // Handle Fetch Subjects
    useEffect(() => {
        dispatch(getSubjects({ search, page, limit }));
    }, [dispatch, search, page, limit]);

    function handlePaginationActions(action) {
        const value =
            action === "prev" ? data.currentPage - 1 : data.currentPage + 1;

        dispatch(handleTableActions({ key: "page", value }));
    }

    function handleChangeSubjectsLimit(e) {
        const newLimit = +e.target.value || 15;

        dispatch(handleTableActions({ key: "limit", value: newLimit }));
    }

    // Handle Delete Subject
    const [subjectToDelete, setSubjectToDelete] = useState(null);

    useEffect(() => {
        if (message) {
            dispatch(setSuccessAlert(message));
            dispatch(clearSubjectDeleteMessage());
        }

        if (deleteError) {
            dispatch(setErrorAlert(deleteError.message));
            dispatch(clearSubjectDeleteError());
        }
    }, [message, deleteError, dispatch]);

    async function handleConfirmDelete() {
        dispatch(deleteSubject(subjectToDelete._id));

        setSubjectToDelete(null);
    }

    // Handle Update Subject
    const [subjectToUpdate, setSubjectToUpdate] = useState(null);

    return (
        <>
            <div className="mt-5 overflow-x-auto">
                {loading && <PageLoading />}
                {error && <PageError message={error.message} />}

                {(!data || !data?.subjects?.length) && (
                    <NoDataAvailable message="No subjects available." />
                )}

                {data?.subjects?.length > 0 && (
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="text-xs font-medium text-slate-400">
                                <th className="pb-3 pr-4">Subject</th>
                                <th className="pb-3 pr-4">Classes Count</th>
                                <th className="pb-3 pr-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.subjects.map((subject) => (
                                <tr
                                    key={subject._id}
                                    className="border-t border-slate-50 text-sm hover:bg-violet-50"
                                >
                                    <td className="py-3 pr-4">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                                                <BookOpen className="h-4 w-4" />
                                            </span>

                                            <p className="font-semibold text-slate-800 capitalize">
                                                {subject.title}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="py-3 pr-4 text-slate-600">
                                        {subject.classes.length ?? 0}
                                    </td>

                                    <td className="py-3 pr-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-100 text-teal-600 transition hover:bg-teal-200 cursor-pointer"
                                                onClick={() =>
                                                    setSubjectToUpdate(subject)
                                                }
                                                title="Update Subject"
                                            >
                                                <Pencil className="h-3.5 w-3.5" />
                                            </button>

                                            <button
                                                className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-600 transition hover:bg-violet-200 cursor-pointer"
                                                onClick={() =>
                                                    setSubjectToDelete(subject)
                                                }
                                                title="Delete Subject"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
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
                    <span>Subjects per page:</span>
                    <select
                        name="subjectsPerPage"
                        id="subjectsPerPage"
                        onChange={handleChangeSubjectsLimit}
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

            {subjectToUpdate && (
                <Modal
                    isOpen={subjectToUpdate}
                    onClose={() => setSubjectToUpdate(null)}
                    title="Update Subject"
                >
                    <UpdateSubjectForm
                        onClose={() => setSubjectToUpdate(null)}
                        subjectToUpdate={subjectToUpdate}
                        onUpdated={() =>
                            dispatch(getSubjects({ search, page, limit }))
                        }
                    />
                </Modal>
            )}

            <ConfirmModal
                isOpen={!!subjectToDelete}
                onClose={() => setSubjectToDelete(null)}
                onConfirm={handleConfirmDelete}
                title="Delete Subject"
                message={`Are you sure you want to delete "${
                    subjectToDelete?.title || "this subject"
                }"? This action cannot be undone.`}
                confirmLabel="Delete"
                loading={deleting}
            />
        </>
    );
}
