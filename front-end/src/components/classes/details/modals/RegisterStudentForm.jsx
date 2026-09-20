import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputError from "../../../global/InputError";
import InputLoading from "../../../global/InputLoading";

import { getUsers } from "../../../../store/slices/users.slice";

import {
    clearAssignStudentAlerts,
    registerStudentToClass,
} from "../../../../store/slices/classes.slice";

import {
    setErrorAlert,
    setSuccessAlert,
} from "../../../../store/slices/alert.slice";

export default function RegisterStudentForm({
    classId,
    enrolledStudents,
    onClose,
    onRegistered,
}) {
    const dispatch = useDispatch();

    const { registering, message, error } = useSelector(
        (state) => state.classes.studentRegistrationData
    );

    const {
        data: usersData,
        loading: usersLoading,
        error: usersError,
    } = useSelector((state) => state.users.usersList);

    const [studentId, setStudentId] = useState("");
    const [studentSearch, setStudentSearch] = useState("");

    useEffect(() => {
        dispatch(
            getUsers({
                page: 1,
                limit: 100,
                role: "student",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            dispatch(setErrorAlert(error?.message || "An error occurred"));
        }

        if (message) {
            dispatch(setSuccessAlert(message));

            onRegistered?.();
            onClose();
        }

        return () => {
            dispatch(clearAssignStudentAlerts());
        };
    }, [dispatch, message, error, onClose, onRegistered]);

    const users = usersData?.users || [];

    const enrolledIds = (enrolledStudents || []).map((student) => student._id);

    const students = users.filter(
        (user) => user.role === "student" && !enrolledIds.includes(user._id)
    );

    const handleStudentChange = (e) => {
        const value = e.target.value;

        setStudentSearch(value);

        const student = students.find(
            (user) => user.fullName === value || user.email === value
        );

        setStudentId(student?._id || "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            registerStudentToClass({
                classId,
                studentId,
            })
        );
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Class Registration
                </p>

                <div className="mt-3">
                    <label className="mb-1 block text-xs font-medium text-slate-500">
                        Student
                    </label>

                    <input
                        type="text"
                        list="class-students"
                        value={studentSearch}
                        onChange={handleStudentChange}
                        placeholder="Search student by full name or email"
                        disabled={usersLoading}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
                    />

                    <datalist id="class-students">
                        {students.map((student) => (
                            <option key={student._id} value={student.fullName}>
                                {student.email}
                            </option>
                        ))}
                    </datalist>

                    {error?.errors?.studentId && (
                        <InputError message={error.errors.studentId} />
                    )}

                    {usersError && (
                        <div className="mt-2">
                            <InputError
                                message={usersError?.message || usersError}
                            />
                        </div>
                    )}

                    {!usersLoading && !students.length && (
                        <p className="mt-2 text-xs text-slate-400">
                            No available students found.
                        </p>
                    )}
                </div>
            </div>

            <button
                type="submit"
                disabled={registering || usersLoading || !studentId}
                className="w-full cursor-pointer rounded-md bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {registering ? <InputLoading /> : "Register Student"}
            </button>
        </form>
    );
}
