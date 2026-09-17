import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputError from "../global/InputError";
import InputLoading from "../global/InputLoading";

import { getInputError } from "../../lib/input.errors";
import {
    updateRoom,
    clearRoomUpdateMessage,
    clearRoomUpdateError,
} from "../../store/slices/rooms.slice";
import { setErrorAlert, setSuccessAlert } from "../../store/slices/alert.slice";

export default function UpdateRoomForm({ onClose, roomToUpdate, onUpdated }) {
    const dispatch = useDispatch();
    const { message, updating, error } = useSelector(
        (state) => state.rooms.updateData
    );

    const [form, setForm] = useState({
        title: roomToUpdate?.title || "",
        roomNumber: roomToUpdate?.roomNumber ?? "",
    });

    useEffect(() => {
        if (error && !error.errors) {
            dispatch(setErrorAlert(error.message));
        }

        if (message) {
            dispatch(setSuccessAlert(message));

            onUpdated?.();
            onClose();

            dispatch(clearRoomUpdateMessage());
            dispatch(clearRoomUpdateError());
        }

        return () => {
            dispatch(clearRoomUpdateMessage());
            dispatch(clearRoomUpdateError());
        };
    }, [dispatch, message, error]);

    const inputErrors = error?.errors ? getInputError(error.errors) : {};

    const updateField = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(
            updateRoom({
                roomId: roomToUpdate._id,
                title: form.title,
                roomNumber: +form.roomNumber,
            })
        );
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Room Details
                </p>

                <div className="mt-3 space-y-4">
                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-500">
                            Room Title
                        </label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={updateField("title")}
                            placeholder="e.g. Science Lab"
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                        {inputErrors.title && (
                            <InputError message={inputErrors.title} />
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-500">
                            Room Number
                        </label>
                        <input
                            type="number"
                            value={form.roomNumber}
                            onChange={updateField("roomNumber")}
                            placeholder="e.g. 101"
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                        {inputErrors.roomNumber && (
                            <InputError message={inputErrors.roomNumber} />
                        )}
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={updating}
                className="w-full rounded-md bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60 cursor-pointer"
            >
                {updating ? <InputLoading /> : "Update"}
            </button>
        </form>
    );
}
