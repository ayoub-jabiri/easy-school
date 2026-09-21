import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../global/Modal";
import InputError from "../global/InputError";
import InputLoading from "../global/InputLoading";
import {
    createGrade,
    clearGradesRegisterAlerts,
    getGrades,
} from "../../store/slices/grades.slice";
import { getClassById, getClasses } from "../../store/slices/classes.slice";
import { setErrorAlert, setSuccessAlert } from "../../store/slices/alert.slice";
import { getInputError } from "../../lib/input.errors";

const initialFormState = {
    classId: "",
    studentId: "",
    evaluation: "",
    grade: "",
};

export default function CreateGradeModal({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const { message, registering, error } = useSelector(
        (state) => state.grades.registerData
    );
    const {
        classesList: { data: classesData },
        classDetails: { data: selectedClass },
    } = useSelector((state) => state.classes);
    const { user } = useSelector((state) => state.user);
    const {
        tableActions: { search, classId, studentId, subjectId, page, limit },
    } = useSelector((state) => state.grades.gradesList);

    const [form, setForm] = useState(initialFormState);

    useEffect(() => {
        if (isOpen) {
            dispatch(getClasses({ limit: 100 }));
        }
    }, [dispatch, isOpen]);

    useEffect(() => {
        if (error && !error.errors) {
            dispatch(setErrorAlert(error.message));
        }

        if (message) {
            dispatch(setSuccessAlert(message));

            onClose();

            dispatch(
                getGrades({
                    search,
                    classId,
                    studentId,
                    subjectId,
                    page,
                    limit,
                })
            );

            dispatch(clearGradesRegisterAlerts());
        }
    }, [dispatch, message, error]);

    const inputErrors = error?.errors ? getInputError(error.errors) : {};

    const myClasses =
        classesData?.classes?.filter(
            (currentClass) => currentClass.teacherId?._id === user?._id
        ) || [];

    useEffect(() => {
        dispatch(getClassById(form.classId));
    }, [dispatch, form.classId]);

    const updateField = (e) => {
        const { name, value } = e.target;

        if (name === "classId") {
            setForm({ ...form, classId: value, studentId: "" });
            return;
        }

        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            createGrade({
                classId: form.classId,
                studentId: form.studentId,
                evaluation: form.evaluation,
                grade: +form.grade,
            })
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Register New Grade">
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Grade Details
                    </p>

                    <div className="mt-3 grid grid-cols-1 gap-4">
                        <div>
                            <label className="mb-1 block text-xs font-medium text-slate-500">
                                Class
                            </label>
                            <select
                                value={form.classId}
                                onChange={updateField}
                                name="classId"
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition capitalize focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="">
                                    Select one of your classes
                                </option>
                                {myClasses.map((currentClass) => (
                                    <option
                                        key={currentClass._id}
                                        value={currentClass._id}
                                    >
                                        {currentClass.subjectId?.title} —{" "}
                                        {currentClass.level} Year{" "}
                                        {currentClass.levelYear} (Group{" "}
                                        {currentClass.group})
                                    </option>
                                ))}
                            </select>
                            {inputErrors.classId && (
                                <InputError message={inputErrors.classId} />
                            )}
                            {myClasses.length === 0 && (
                                <p className="mt-1 text-xs text-slate-400">
                                    You aren't assigned to any classes yet.
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-medium text-slate-500">
                                Student
                            </label>
                            <select
                                value={form.studentId}
                                onChange={updateField}
                                name="studentId"
                                disabled={!selectedClass}
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50 disabled:text-slate-400"
                            >
                                <option value="">Select a student</option>
                                {selectedClass?.students?.map((student) => (
                                    <option
                                        key={student._id}
                                        value={student._id}
                                    >
                                        {student.fullName}
                                    </option>
                                ))}
                            </select>
                            {inputErrors.studentId && (
                                <InputError message={inputErrors.studentId} />
                            )}
                            {selectedClass &&
                                selectedClass.students?.length === 0 && (
                                    <p className="mt-1 text-xs text-slate-400">
                                        This class doesn't have any students
                                        registered yet.
                                    </p>
                                )}
                        </div>

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
                    disabled={registering}
                    className="w-full rounded-md bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60 cursor-pointer"
                >
                    {registering ? <InputLoading /> : "Register"}
                </button>
            </form>
        </Modal>
    );
}
