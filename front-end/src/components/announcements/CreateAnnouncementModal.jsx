import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../global/Modal";
import InputError from "../global/InputError";
import InputLoading from "../global/InputLoading";
import {
    createAnnouncement,
    clearAnnouncementsRegisterAlerts,
    getAnnouncements,
} from "../../store/slices/announcements.slice";
import { setErrorAlert, setSuccessAlert } from "../../store/slices/alert.slice";
import { getInputError } from "../../lib/input.errors";

const initialFormState = {
    title: "",
    description: "",
};

export default function CreateAnnouncementModal({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const { message, registering, error } = useSelector(
        (state) => state.announcements.registerData
    );
    const {
        tableActions: { search, startDate, endDate, page, limit },
    } = useSelector((state) => state.announcements.announcementsList);

    const [form, setForm] = useState(initialFormState);

    useEffect(() => {
        if (error && !error.errors) {
            dispatch(setErrorAlert(error.message));
        }

        if (message) {
            dispatch(setSuccessAlert(message));

            onClose();

            dispatch(
                getAnnouncements({
                    search,
                    startDate,
                    endDate,
                    page,
                    limit,
                })
            );

            dispatch(clearAnnouncementsRegisterAlerts());
        }
    }, [dispatch, message, error]);

    const inputErrors = error?.errors ? getInputError(error.errors) : {};

    const updateField = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createAnnouncement(form));
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create New Announcement"
        >
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Announcement Details
                    </p>

                    <div className="mt-3 grid grid-cols-1 gap-4">
                        <div>
                            <label className="mb-1 block text-xs font-medium text-slate-500">
                                Title
                            </label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={updateField}
                                name="title"
                                placeholder="e.g. Summer Camp Trip"
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                            {inputErrors.title && (
                                <InputError message={inputErrors.title} />
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-medium text-slate-500">
                                Description
                            </label>
                            <textarea
                                rows={4}
                                value={form.description}
                                onChange={updateField}
                                name="description"
                                placeholder="What should everyone know?"
                                className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                            {inputErrors.description && (
                                <InputError message={inputErrors.description} />
                            )}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={registering}
                    className="w-full rounded-md bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60 cursor-pointer"
                >
                    {registering ? <InputLoading /> : "Create"}
                </button>
            </form>
        </Modal>
    );
}
