import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputError from "../global/InputError";
import InputLoading from "../global/InputLoading";
import { getInputError } from "../../lib/input.errors";
import {
    updateHomework,
    clearHomeworkUpdateAlerts,
} from "../../store/slices/homework.slice";
import { setErrorAlert, setSuccessAlert } from "../../store/slices/alert.slice";

export default function UpdateHomeworkForm({
    onClose,
    homeworkToUpdate,
    onUpdated,
}) {
    const dispatch = useDispatch();
    const { message, updating, error } = useSelector(
        (state) => state.homework.updateData
    );

    const [form, setForm] = useState({
        title: homeworkToUpdate?.title || "",
        description: homeworkToUpdate?.description || "",
        dueDate: homeworkToUpdate?.dueDate
            ? homeworkToUpdate.dueDate.split("T")[0]
            : "",
    });

    useEffect(() => {
        if (error && !error.errors) {
            dispatch(setErrorAlert(error.message));
        }

        if (message) {
            dispatch(setSuccessAlert(message));

            onUpdated?.();
            onClose();

            dispatch(clearHomeworkUpdateAlerts());
        }
    }, [dispatch, message, error]);

    const inputErrors = error?.errors ? getInputError(error.errors) : {};

    const updateField = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            updateHomework({
                homeworkId: homeworkToUpdate._id,
                title: form.title,
                description: form.description,
                dueDate: form.dueDate,
            })
        );
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Homework Details
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
                            className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                        {inputErrors.description && (
                            <InputError message={inputErrors.description} />
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-500">
                            Due Date
                        </label>
                        <input
                            type="date"
                            value={form.dueDate}
                            onChange={updateField}
                            name="dueDate"
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                        {inputErrors.dueDate && (
                            <InputError message={inputErrors.dueDate} />
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
