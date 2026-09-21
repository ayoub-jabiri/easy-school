import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../global/Modal";
import InputError from "../global/InputError";
import InputLoading from "../global/InputLoading";
import { getInputError } from "../../lib/input.errors";
import {
    updateGrade,
    clearGradesUpdateAlerts,
} from "../../store/slices/grades.slice";
import { setErrorAlert, setSuccessAlert } from "../../store/slices/alert.slice";

export default function UpdateGradeModal({
    isOpen,
    onClose,
    gradeToUpdate,
    onUpdated,
}) {
    const dispatch = useDispatch();
    const { message, updating, error } = useSelector(
        (state) => state.grades.updateData
    );

    const [form, setForm] = useState({
        evaluation: gradeToUpdate?.evaluation || "",
        grade: gradeToUpdate?.grade ?? "",
    });

    useEffect(() => {
        setForm({
            evaluation: gradeToUpdate?.evaluation || "",
            grade: gradeToUpdate?.grade ?? "",
        });
    }, [gradeToUpdate]);

    useEffect(() => {
        if (error && !error.errors) {
            dispatch(setErrorAlert(error.message));
        }

        if (message) {
            dispatch(setSuccessAlert(message));

            onUpdated?.();
            onClose();

            dispatch(clearGradesUpdateAlerts());
        }
    }, [dispatch, message, error]);

    const inputErrors = error?.errors ? getInputError(error.errors) : {};

    const updateField = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            updateGrade({
                gradeId: gradeToUpdate._id,
                evaluation: form.evaluation,
                grade: +form.grade,
            })
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Update Grade">
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Grade Details
                    </p>

                    <div className="mt-3 grid grid-cols-1 gap-4">
                        <div>
                            <label className="mb-1 block text-xs font-medium text-slate-500">
                                Evaluation
                            </label>
                            <input
                                type="text"
                                value={form.evaluation}
                                onChange={updateField}
                                name="evaluation"
                                placeholder="e.g. Good"
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                            {inputErrors.evaluation && (
                                <InputError message={inputErrors.evaluation} />
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-medium text-slate-500">
                                Grade (out of 20)
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="20"
                                step="0.25"
                                value={form.grade}
                                onChange={updateField}
                                name="grade"
                                placeholder="e.g. 15.5"
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                            {inputErrors.grade && (
                                <InputError message={inputErrors.grade} />
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
        </Modal>
    );
}
