import { Eye, Pencil, Trash2 } from "lucide-react";
import NoDataAvailable from "../global/NoDataAvailable";
import ConfirmModal from "../global/ConfirmModal";
import Modal from "../global/Modal";
import UpdateHomeworkForm from "./UpdateHomeworkForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    deleteHomework,
    getHomeworks,
    handleTableActions,
    clearHomeworkDeleteAtlerts,
} from "../../store/slices/homework.slice";
import { setErrorAlert, setSuccessAlert } from "../../store/slices/alert.slice";
import PageLoading from "../global/PageLoading";
import PageError from "../global/PageError";
import { Link } from "react-router";

export default function HomeworkTable() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const {
        data,
        loading,
        error,
        tableActions: { search, classId, status, page, limit },
    } = useSelector((state) => state.homework.homeworksList);
    const {
        message,
        deleting,
        error: deleteError,
    } = useSelector((state) => state.homework.deleteData);

    const isTeacher = user?.role === "teacher";

    // Handle Fetch Homeworks
    useEffect(() => {
        dispatch(getHomeworks({ search, classId, status, page, limit }));
    }, [dispatch, search, classId, status, page, limit]);

    function handlePaginationActions(action) {
        const value =
            action === "prev" ? data.currentPage - 1 : data.currentPage + 1;

        dispatch(handleTableActions({ key: "page", value }));
    }

    function handleChangeHomeworkLimit(e) {
        const newLimit = +e.target.value || 15;

        dispatch(handleTableActions({ key: "limit", value: newLimit }));
    }

    // Handle Delete Homework
    const [homeworkToDelete, setHomeworkToDelete] = useState(null);

    useEffect(() => {
        if (message) {
            dispatch(setSuccessAlert(message));
            dispatch(clearHomeworkDeleteAtlerts());
        }

        if (deleteError) {
            dispatch(setErrorAlert(deleteError.message));
            dispatch(clearHomeworkDeleteAtlerts());
        }
    }, [message, deleteError, dispatch]);

    function handleConfirmDelete() {
        dispatch(deleteHomework(homeworkToDelete._id));

        setHomeworkToDelete(null);
    }

    // Handle Update Homework
    const [homeworkToUpdate, setHomeworkToUpdate] = useState(null);

    return (
        <>
            <div className="mt-5 overflow-x-auto">
                {loading && <PageLoading />}
                {error && <PageError message={error.message} />}

                {(!data || !data?.homeworks?.length) && (
                    <NoDataAvailable message="No homework assignments available." />
                )}

                {data?.homeworks?.length > 0 && (
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="text-xs font-medium text-slate-400">
                                <th className="pb-3 pr-4">Title</th>
                                <th className="pb-3 pr-4">Subject / Class</th>
                                <th className="pb-3 pr-4">Assigned Date</th>
                                <th className="pb-3 pr-4">Due Date</th>
                                <th className="pb-3 pr-4">Status</th>
                                <th className="pb-3 pr-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.homeworks.map((homework) => {
                                const isExpired =
                                    new Date(homework.dueDate) <= new Date();

                                return (
                                    <tr
                                        key={homework._id}
                                        className="border-t border-slate-50 text-sm hover:bg-violet-50"
                                    >
                                        <td className="py-3 pr-4 font-semibold text-slate-800 capitalize">
                                            {homework.title}
                                        </td>

                                        <td className="py-3 pr-4 text-slate-600 capitalize">
                                            {homework.classId?.subjectId
                                                ?.title || "—"}{" "}
                                            ({homework.classId?.level} Year{" "}
                                            {homework.classId?.levelYear}, Group{" "}
                                            {homework.classId?.group})
                                        </td>

                                        <td className="py-3 pr-4 text-slate-600">
                                            {homework.createdAt
                                                ? homework.createdAt.split(
                                                      "T"
                                                  )[0]
                                                : "—"}
                                        </td>

                                        <td className="py-3 pr-4 text-slate-600">
                                            {homework.dueDate
                                                ? homework.dueDate.split("T")[0]
                                                : "—"}
                                        </td>

                                        <td className="py-3 pr-4">
                                            <span
                                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                                    isExpired
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-emerald-100 text-emerald-700"
                                                }`}
                                            >
                                                {isExpired
                                                    ? "Expired"
                                                    : "Active"}
                                            </span>
                                        </td>

                                        <td className="py-3 pr-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    to={`/homework/${homework._id}`}
                                                    className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-600 transition hover:bg-sky-200 cursor-pointer"
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                </Link>
                                                {isTeacher && (
                                                    <>
                                                        <button
                                                            className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-100 text-teal-600 transition hover:bg-teal-200 cursor-pointer"
                                                            onClick={() =>
                                                                setHomeworkToUpdate(
                                                                    homework
                                                                )
                                                            }
                                                            title="Update Homework"
                                                        >
                                                            <Pencil className="h-3.5 w-3.5" />
                                                        </button>

                                                        <button
                                                            className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-600 transition hover:bg-violet-200 cursor-pointer"
                                                            onClick={() =>
                                                                setHomeworkToDelete(
                                                                    homework
                                                                )
                                                            }
                                                            title="Delete Homework"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
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
                    <span>Homework per page:</span>
                    <select
                        name="homeworkPerPage"
                        id="homeworkPerPage"
                        onChange={handleChangeHomeworkLimit}
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

            {isTeacher && homeworkToUpdate && (
                <Modal
                    isOpen={!!homeworkToUpdate}
                    onClose={() => setHomeworkToUpdate(null)}
                    title="Update Homework"
                >
                    <UpdateHomeworkForm
                        onClose={() => setHomeworkToUpdate(null)}
                        homeworkToUpdate={homeworkToUpdate}
                        onUpdated={() =>
                            dispatch(
                                getHomeworks({
                                    search,
                                    classId,
                                    status,
                                    page,
                                    limit,
                                })
                            )
                        }
                    />
                </Modal>
            )}

            {isTeacher && (
                <ConfirmModal
                    isOpen={!!homeworkToDelete}
                    onClose={() => setHomeworkToDelete(null)}
                    onConfirm={handleConfirmDelete}
                    title="Delete Homework"
                    message={`Are you sure you want to delete "${
                        homeworkToDelete?.title || "this homework"
                    }"? This action cannot be undone.`}
                    confirmLabel="Delete"
                    loading={deleting}
                />
            )}
        </>
    );
}
