import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../global/Modal";
import InputError from "../global/InputError";
import InputLoading from "../global/InputLoading";
import {
    createRoom,
    clearRoomsError,
    clearRoomsMessage,
    getRooms,
} from "../../store/slices/rooms.slice";
import { setErrorAlert, setSuccessAlert } from "../../store/slices/alert.slice";
import { getInputError } from "../../lib/input.errors";

const initialFormState = {
    title: "",
    roomNumber: "",
};

export default function CreateRoomModal({ isOpen, onClose }) {
    const { message, registering, error } = useSelector(
        (state) => state.rooms.registerData
    );
    const dispatch = useDispatch();

    const [form, setForm] = useState(initialFormState);

    useEffect(() => {
        if (error && !error.errors) {
            dispatch(setErrorAlert(error.message));
        }
        if (message) {
            dispatch(setSuccessAlert(message));

            onClose();

            dispatch(getRooms());

            dispatch(clearRoomsError());
            dispatch(clearRoomsMessage());
        }
    }, [dispatch, message, error]);

    const inputErrors = error?.errors ? getInputError(error.errors) : {};

    const updateField = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(
            createRoom({
                title: form.title,
                roomNumber: +form.roomNumber,
            })
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Register New Room">
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
                    disabled={registering}
                    className="w-full rounded-md bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60 cursor-pointer"
                >
                    {registering ? <InputLoading /> : "Register"}
                </button>
            </form>
        </Modal>
    );
}
