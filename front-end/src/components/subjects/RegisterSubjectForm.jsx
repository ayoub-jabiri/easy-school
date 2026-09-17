import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputError from "../global/InputError";
import InputLoading from "../global/InputLoading";
import {
    createSubject,
    clearSubjectsError,
    clearSubjectsMessage,
    getSubjects,
} from "../../store/slices/subjects.slice";
import { setErrorAlert, setSuccessAlert } from "../../store/slices/alert.slice";
import { getInputError } from "../../lib/input.errors";

const initialFormState = {
    title: "",
};

export default function RegisterSubjectForm({ onClose }) {
    const { message, registering, error } = useSelector(
        (state) => state.subjects.registerData
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

            dispatch(getSubjects());

            dispatch(clearSubjectsError());
            dispatch(clearSubjectsMessage());
        }
    }, [dispatch, message, error]);

    const inputErrors = error?.errors ? getInputError(error.errors) : {};

    const updateField = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(createSubject(form));
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Subject Details
                </p>

                <div className="mt-3">
                    <label className="mb-1 block text-xs font-medium text-slate-500">
                        Subject Title
                    </label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={updateField("title")}
                        placeholder="e.g. Mathematics"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                    {inputErrors.title && (
                        <InputError message={inputErrors.title} />
                    )}
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
    );
}
