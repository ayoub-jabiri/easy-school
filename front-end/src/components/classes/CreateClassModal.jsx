import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../global/Modal";
import InputError from "../global/InputError";
import InputLoading from "../global/InputLoading";
import {
    createClass,
    clearClassesError,
    clearClassesMessage,
    getClasses,
} from "../../store/slices/classes.slice";
import { getRooms } from "../../store/slices/rooms.slice";
import { getSubjects } from "../../store/slices/subjects.slice";
import { setErrorAlert, setSuccessAlert } from "../../store/slices/alert.slice";
import { getInputError } from "../../lib/input.errors";

const initialFormState = {
    level: "",
    levelYear: "",
    group: "",
    schoolRoomId: "",
    subjectId: "",
};

export default function CreateClassModal({ isOpen, onClose }) {
    const { message, registering, error } = useSelector(
        (state) => state.classes.registerData
    );
    const { data: roomsData } = useSelector((state) => state.rooms.roomsList);
    const { data: subjectsData } = useSelector(
        (state) => state.subjects.subjectsList
    );
    const dispatch = useDispatch();

    const [form, setForm] = useState(initialFormState);

    useEffect(() => {
        if (isOpen) {
            dispatch(getRooms({ limit: 100 }));
            dispatch(getSubjects({ limit: 100 }));
        }
    }, [dispatch, isOpen]);

    useEffect(() => {
        if (error && !error.errors) {
            dispatch(setErrorAlert(error.message));
        }
        if (message) {
            dispatch(setSuccessAlert(message));

            onClose();

            dispatch(getClasses());

            dispatch(clearClassesError());
            dispatch(clearClassesMessage());
        }
    }, [dispatch, message, error]);

    const inputErrors = error?.errors ? getInputError(error.errors) : {};

    const updateField = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(
            createClass({
                level: form.level,
                levelYear: +form.levelYear,
                group: +form.group,
                schoolRoomId: form.schoolRoomId,
                subjectId: form.subjectId,
            })
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Register New Class">
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Class Details
                    </p>

                    <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-xs font-medium text-slate-500">
                                School Level
                            </label>
                            <select
                                value={form.level}
                                name="level"
                                onChange={updateField}
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="">Select a subject</option>
                                <option value="primary">Primary</option>
                                <option value="middle">Middle</option>
                                <option value="high">High</option>
                            </select>
                            {inputErrors.level && (
                                <InputError message={inputErrors.level} />
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-medium text-slate-500">
                                Level Year
                            </label>
                            <select
                                value={form.levelYear}
                                name="levelYear"
                                onChange={updateField}
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="">Select a level year</option>
                                {[1, 2, 3, 4, 5, 6].map((year) => (
                                    <option key={year} value={year}>
                                        Year {year}
                                    </option>
                                ))}
                            </select>
                            {inputErrors.levelYear && (
                                <InputError message={inputErrors.levelYear} />
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-medium text-slate-500">
                                Group Number
                            </label>
                            <input
                                type="number"
                                name="group"
                                min="1"
                                value={form.group}
                                onChange={updateField}
                                placeholder="e.g. 1"
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                            {inputErrors.group && (
                                <InputError message={inputErrors.group} />
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-medium text-slate-500">
                                Subject
                            </label>
                            <select
                                value={form.subjectId}
                                onChange={updateField}
                                name="subjectId"
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="">Select a subject</option>
                                {subjectsData?.subjects?.map((subject) => (
                                    <option
                                        key={subject._id}
                                        value={subject._id}
                                    >
                                        {subject.title}
                                    </option>
                                ))}
                            </select>
                            {inputErrors.subjectId && (
                                <InputError message={inputErrors.subjectId} />
                            )}
                        </div>

                        <div className="sm:col-span-2">
                            <label className="mb-1 block text-xs font-medium text-slate-500">
                                School Room
                            </label>
                            <select
                                value={form.schoolRoomId}
                                onChange={updateField}
                                name="schoolRoomId"
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="">Select a room</option>
                                {roomsData?.rooms?.map((room) => (
                                    <option key={room._id} value={room._id}>
                                        {room.title} (#{room.roomNumber})
                                    </option>
                                ))}
                            </select>
                            {inputErrors.schoolRoomId && (
                                <InputError
                                    message={inputErrors.schoolRoomId}
                                />
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
