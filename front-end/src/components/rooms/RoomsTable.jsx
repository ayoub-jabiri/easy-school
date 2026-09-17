import { DoorOpen, Pencil, Trash2 } from "lucide-react";
import NoDataAvailable from "../global/NoDataAvailable";
import ConfirmModal from "../global/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    deleteRoom,
    clearRoomDeleteError,
    clearRoomDeleteMessage,
    getRooms,
    handleTableActions,
} from "../../store/slices/rooms.slice";
import { setErrorAlert, setSuccessAlert } from "../../store/slices/alert.slice";
import PageLoading from "../global/PageLoading";
import PageError from "../global/PageError";
import Modal from "../global/Modal";
import UpdateRoomForm from "./UpdateRoomForm";

export default function RoomsTable() {
    const dispatch = useDispatch();
    const {
        data,
        loading,
        error,
        tableActions: { search, page, limit },
    } = useSelector((state) => state.rooms.roomsList);
    const {
        message,
        deleting,
        error: deleteError,
    } = useSelector((state) => state.rooms.deleteData);

    // Handle Fetch Rooms
    useEffect(() => {
        dispatch(getRooms({ search, page, limit }));
    }, [dispatch, search, page, limit]);

    function handlePaginationActions(action) {
        const value =
            action === "prev" ? data.currentPage - 1 : data.currentPage + 1;

        dispatch(handleTableActions({ key: "page", value }));
    }

    function handleChangeRoomsLimit(e) {
        const newLimit = +e.target.value || 15;

        dispatch(handleTableActions({ key: "limit", value: newLimit }));
    }

    // Handle Delete Room
    const [roomToDelete, setRoomToDelete] = useState(null);

    useEffect(() => {
        if (message) {
            dispatch(setSuccessAlert(message));
            dispatch(clearRoomDeleteMessage());
        }

        if (deleteError) {
            dispatch(setErrorAlert(deleteError.message));
            dispatch(clearRoomDeleteError());
        }
    }, [message, deleteError, dispatch]);

    async function handleConfirmDelete() {
        dispatch(deleteRoom(roomToDelete._id));

        setRoomToDelete(null);
    }

    // Handle Update Room
    const [roomToUpdate, setRoomToUpdate] = useState(null);

    return (
        <>
            <div className="mt-5 overflow-x-auto">
                {loading && <PageLoading />}
                {error && <PageError message={error.message} />}

                {(!data || !data?.rooms?.length) && (
                    <NoDataAvailable message="No rooms available." />
                )}

                {data?.rooms?.length > 0 && (
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="text-xs font-medium text-slate-400">
                                <th className="pb-3 pr-4">Room</th>
                                <th className="pb-3 pr-4">Room Number</th>
                                <th className="pb-3 pr-4">Classes Count</th>
                                <th className="pb-3 pr-4">Status</th>
                                <th className="pb-3 pr-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.rooms.map((room) => {
                                const classesCount = room.classes?.length || 0;
                                const isOccupied = classesCount > 0;

                                return (
                                    <tr
                                        key={room._id}
                                        className="border-t border-slate-50 text-sm hover:bg-violet-50"
                                    >
                                        <td className="py-3 pr-4">
                                            <div className="flex items-center gap-3">
                                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                                                    <DoorOpen className="h-4 w-4" />
                                                </span>

                                                <p className="font-semibold text-slate-800 capitalize">
                                                    {room.title}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="py-3 pr-4 text-slate-600">
                                            {room.roomNumber}
                                        </td>

                                        <td className="py-3 pr-4 text-slate-600">
                                            {classesCount}
                                        </td>

                                        <td className="py-3 pr-4">
                                            <span
                                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                                    isOccupied
                                                        ? "bg-amber-100 text-amber-700"
                                                        : "bg-emerald-100 text-emerald-700"
                                                }`}
                                            >
                                                {isOccupied
                                                    ? "Occupied"
                                                    : "Available"}
                                            </span>
                                        </td>

                                        <td className="py-3 pr-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-100 text-teal-600 transition hover:bg-teal-200 cursor-pointer"
                                                    onClick={() =>
                                                        setRoomToUpdate(room)
                                                    }
                                                    title="Update Room"
                                                >
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </button>

                                                <button
                                                    className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-600 transition hover:bg-violet-200 cursor-pointer"
                                                    onClick={() =>
                                                        setRoomToDelete(room)
                                                    }
                                                    title="Delete Room"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
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
                    <span>Rooms per page:</span>
                    <select
                        name="roomsPerPage"
                        id="roomsPerPage"
                        onChange={handleChangeRoomsLimit}
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

            {roomToUpdate && (
                <Modal
                    isOpen={roomToUpdate}
                    onClose={() => setRoomToUpdate(null)}
                    title="Update Room"
                >
                    <UpdateRoomForm
                        onClose={() => setRoomToUpdate(null)}
                        roomToUpdate={roomToUpdate}
                        onUpdated={() =>
                            dispatch(getRooms({ search, page, limit }))
                        }
                    />
                </Modal>
            )}

            <ConfirmModal
                isOpen={!!roomToDelete}
                onClose={() => setRoomToDelete(null)}
                onConfirm={handleConfirmDelete}
                title="Delete Room"
                message={`Are you sure you want to delete "${
                    roomToDelete?.title || "this room"
                }"? This action cannot be undone.`}
                confirmLabel="Delete"
                loading={deleting}
            />
        </>
    );
}
