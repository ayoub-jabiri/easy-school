import { Pencil, Trash2 } from "lucide-react";
import Avatar from "../global/Avatar";
import NoDataAvailable from "../global/NoDataAvailable";
import ConfirmModal from "../global/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    deleteGuardian,
    clearGuardianDeleteError,
    clearGuardianDeleteMessage,
    getGuardians,
    handleTableActions,
} from "../../store/slices/guardian.slice";
import { setErrorAlert, setSuccessAlert } from "../../store/slices/alert.slice";
import PageLoading from "../global/PageLoading";
import PageError from "../global/PageError";
import Modal from "../global/Modal";
import UpdateGuardianForm from "./UpdateGuardianForm";

export default function GuardiansTable() {
    const dispatch = useDispatch();
    const {
        data,
        loading,
        error,
        tableActions: { search, page, limit },
    } = useSelector((state) => state.guardians.guardiansList);
    const {
        message,
        deleting,
        error: deleteError,
    } = useSelector((state) => state.guardians.deleteData);

    // Handle Fetch Guardians
    useEffect(() => {
        dispatch(getGuardians({ search, page, limit }));
    }, [dispatch, search, page, limit]);

    function handlePaginationActions(action) {
        const value =
            action === "prev" ? data.currentPage - 1 : data.currentPage + 1;

        dispatch(handleTableActions({ key: "page", value }));
    }

    function handleChangeGuardiansLimit(e) {
        const newLimit = +e.target.value || 15;

        dispatch(handleTableActions({ key: "limit", value: newLimit }));
    }

    // Handle Delete Guardian
    const [guardianToDelete, setGuardianToDelete] = useState(null);

    useEffect(() => {
        if (message) {
            dispatch(setSuccessAlert(message));
            dispatch(clearGuardianDeleteMessage());
        }

        if (deleteError) {
            dispatch(setErrorAlert(deleteError.message));
            dispatch(clearGuardianDeleteError());
        }
    }, [message, deleteError, dispatch]);

    async function handleConfirmDelete() {
        dispatch(deleteGuardian(guardianToDelete._id));

        setGuardianToDelete(null);
    }

    // Handle Update Guardian
    const [guardianToUpdate, setGuardianToUpdate] = useState(null);

    return (
        <>
            <div className="mt-5 overflow-x-auto">
                {loading && <PageLoading />}
                {error && <PageError message={error.message} />}

                {(!data || !data?.guardians?.length) && (
                    <NoDataAvailable message="No parents available." />
                )}

                {data?.guardians?.length > 0 && (
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="text-xs font-medium text-slate-400">
                                <th className="pb-3 pr-4">Info</th>
                                <th className="pb-3 pr-4">Student Name</th>
                                <th className="pb-3 pr-4">Phone</th>
                                <th className="pb-3 pr-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.guardians.map((guardian) => (
                                <tr
                                    key={guardian._id}
                                    className="border-t border-slate-50 text-sm hover:bg-violet-50"
                                >
                                    <td className="py-3 pr-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                name={
                                                    guardian.parentId
                                                        ?.fullName || "Unknown"
                                                }
                                            />

                                            <div>
                                                <p className="font-semibold text-slate-800 capitalize">
                                                    {guardian.parentId
                                                        ?.fullName || "Unknown"}
                                                </p>
                                                <p className="text-xs text-slate-400">
                                                    {guardian.parentId?.email ||
                                                        "No email available"}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="py-3 pr-4 text-slate-600">
                                        {guardian.studentId?.fullName ||
                                            "No student linked"}
                                    </td>

                                    <td className="py-3 pr-4 text-slate-600">
                                        {guardian.parentId?.phoneNumber ||
                                            "No phone available"}
                                    </td>

                                    <td className="py-3 pr-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-100 text-teal-600 transition hover:bg-teal-200 cursor-pointer"
                                                onClick={() =>
                                                    setGuardianToUpdate(
                                                        guardian
                                                    )
                                                }
                                                title="Update Guardian"
                                            >
                                                <Pencil className="h-3.5 w-3.5" />
                                            </button>

                                            <button
                                                className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-600 transition hover:bg-violet-200 cursor-pointer"
                                                onClick={() =>
                                                    setGuardianToDelete(
                                                        guardian
                                                    )
                                                }
                                                title="Delete Guardian"
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
                    <span>Guardians per page:</span>
                    <select
                        name="guardiansPerPage"
                        id="guardiansPerPage"
                        onChange={handleChangeGuardiansLimit}
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

            {guardianToUpdate && (
                <Modal
                    isOpen={guardianToUpdate}
                    onClose={() => setGuardianToUpdate(null)}
                    title="Update Guardian"
                >
                    <UpdateGuardianForm
                        onClose={() => setGuardianToUpdate(null)}
                        guardianToUpdate={guardianToUpdate}
                        onUpdated={() =>
                            dispatch(getGuardians({ search, page, limit }))
                        }
                    />
                </Modal>
            )}

            <ConfirmModal
                isOpen={!!guardianToDelete}
                onClose={() => setGuardianToDelete(null)}
                onConfirm={handleConfirmDelete}
                title="Delete Guardian"
                message={`Are you sure you want to remove ${
                    guardianToDelete?.parentId?.fullName || "this parent"
                } as a guardian of ${
                    guardianToDelete?.studentId?.fullName || "this student"
                }? This action cannot be undone.`}
                confirmLabel="Delete"
                loading={deleting}
            />
        </>
    );
}
