import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputError from "../global/InputError";
import InputLoading from "../global/InputLoading";
import {
    registerGuardian,
    clearGuardiansError,
    clearGuardiansMessage,
    getGuardians,
} from "../../store/slices/guardian.slice";
import { setErrorAlert, setSuccessAlert } from "../../store/slices/alert.slice";
import { getInputError } from "../../lib/input.errors";
import { getUsers } from "../../store/slices/users.slice";

const initialFormState = {
    studentId: "",
    parentId: "",
};

export default function RegisterGuardianForm({ onClose }) {
    const { message, registering, error } = useSelector(
        (state) => state.guardians.registerData
    );
    const { data: users } = useSelector((state) => state.users.usersList);
    const dispatch = useDispatch();

    const [form, setForm] = useState(initialFormState);

    useEffect(() => {
        dispatch(getUsers({ page: 1, limit: 1000 }));
    }, [dispatch]);

    const parents =
        users?.users?.filter((user) => user.role === "parent") || [];
    const students =
        users?.users?.filter((user) => user.role === "student") || [];

    useEffect(() => {
        if (error && !error.errors) {
            dispatch(setErrorAlert(error.message));
        }
        if (message) {
            dispatch(setSuccessAlert(message));

            onClose();

            dispatch(getGuardians());

            dispatch(clearGuardiansError());
            dispatch(clearGuardiansMessage());
        }
    }, [dispatch, message, error]);

    const inputErrors = error?.errors ? getInputError(error.errors) : {};

    const updateField = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(registerGuardian(form));
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Guardian Link
                </p>

                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-500">
                            Student
                        </label>
                        <input
                            type="text"
                            value={form.studentId}
                            onChange={updateField("studentId")}
                            placeholder="e.g. 6a96c10d28e659ca5021a76d"
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                        {/* <select
                            id="student-select"
                            value={form.studentId}
                            onChange={(e) =>
                                setForm({ ...form, studentId: e.target.value })
                            }
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            {students.map((student) => (
                                <option key={student._id} value={student._id}>
                                    {student.fullName}
                                </option>
                            ))}
                        </select> */}
                        {inputErrors.studentId && (
                            <InputError message={inputErrors.studentId} />
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-500">
                            Parent ID
                        </label>
                        <input
                            type="text"
                            value={form.parentId}
                            onChange={updateField("parentId")}
                            placeholder="e.g. 6a9f1076ff6b9ecbd5680f4c"
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                        {inputErrors.parentId && (
                            <InputError message={inputErrors.parentId} />
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
    );
}
