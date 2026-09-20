import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputError from "../global/InputError";
import InputLoading from "../global/InputLoading";

import { getInputError } from "../../lib/input.errors";

import {
    updateGuardian,
    clearGuardinaUpdateAlerts,
} from "../../store/slices/guardian.slice";

import { getUsers } from "../../store/slices/users.slice";

import { setErrorAlert, setSuccessAlert } from "../../store/slices/alert.slice";

export default function UpdateGuardianForm({
    onClose,
    guardianToUpdate,
    onUpdated,
}) {
    const dispatch = useDispatch();

    const { message, updating, error } = useSelector(
        (state) => state.guardians.updateData
    );

    const {
        data: usersData,
        loading: usersLoading,
        error: usersError,
    } = useSelector((state) => state.users.usersList);

    const [form, setForm] = useState({
        studentId: guardianToUpdate?.studentId?._id || "",
        parentId: guardianToUpdate?.parentId?._id || "",
    });

    const [studentSearch, setStudentSearch] = useState(
        guardianToUpdate?.studentId?.fullName || ""
    );

    const [parentSearch, setParentSearch] = useState(
        guardianToUpdate?.parentId?.fullName || ""
    );

    useEffect(() => {
        dispatch(
            getUsers({
                page: 1,
                limit: 100,
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if (error && !error.errors) {
            dispatch(setErrorAlert(error.message));
        }

        if (message) {
            dispatch(setSuccessAlert(message));

            onUpdated?.();
            onClose();
        }

        return () => {
            dispatch(clearGuardinaUpdateAlerts());
        };
    }, [dispatch, message, error, onClose, onUpdated]);

    const inputErrors = error?.errors ? getInputError(error.errors) : {};

    const users = usersData?.users || [];

    const students = users.filter((user) => user.role === "student");

    const parents = users.filter((user) => user.role === "parent");

    const handleStudentChange = (e) => {
        const value = e.target.value;

        setStudentSearch(value);

        const student = students.find(
            (user) => user.fullName === value || user.email === value
        );

        setForm({
            ...form,
            studentId: student?._id || "",
        });
    };

    const handleParentChange = (e) => {
        const value = e.target.value;

        setParentSearch(value);

        const parent = parents.find(
            (user) => user.fullName === value || user.email === value
        );

        setForm({
            ...form,
            parentId: parent?._id || "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            updateGuardian({
                guardianId: guardianToUpdate._id,
                studentId: form.studentId,
                parentId: form.parentId,
            })
        );
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
                            list="update-students"
                            value={studentSearch}
                            onChange={handleStudentChange}
                            placeholder="Search student by full name or email"
                            disabled={usersLoading}
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
                        />

                        <datalist id="update-students">
                            {students.map((student) => (
                                <option
                                    key={student._id}
                                    value={student.fullName}
                                >
                                    {student.email}
                                </option>
                            ))}
                        </datalist>

                        {inputErrors.studentId && (
                            <InputError message={inputErrors.studentId} />
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-500">
                            Parent
                        </label>

                        <input
                            type="text"
                            list="update-parents"
                            value={parentSearch}
                            onChange={handleParentChange}
                            placeholder="Search parent by full name or email"
                            disabled={usersLoading}
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
                        />

                        <datalist id="update-parents">
                            {parents.map((parent) => (
                                <option
                                    key={parent._id}
                                    value={parent.fullName}
                                >
                                    {parent.email}
                                </option>
                            ))}
                        </datalist>

                        {inputErrors.parentId && (
                            <InputError message={inputErrors.parentId} />
                        )}
                    </div>
                </div>

                {usersError && (
                    <div className="mt-2">
                        <InputError
                            message={usersError?.message || usersError}
                        />
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={
                    updating ||
                    usersLoading ||
                    !form.studentId ||
                    !form.parentId
                }
                className="w-full cursor-pointer rounded-md bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {updating ? <InputLoading /> : "Update"}
            </button>
        </form>
    );
}
