import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputError from "../../../global/InputError";
import InputLoading from "../../../global/InputLoading";

import {
    assignTeacherToClass,
    clearAssignTeacherAlerts,
} from "../../../../store/slices/classes.slice";

import { getUsers } from "../../../../store/slices/users.slice";

import {
    setErrorAlert,
    setSuccessAlert,
} from "../../../../store/slices/alert.slice";

export default function AssignTeacherForm({ classId, onClose, onAssigned }) {
    const dispatch = useDispatch();

    const { assigning, message, error } = useSelector(
        (state) => state.classes.teacherAssignmentData
    );

    const {
        data: usersData,
        loading: usersLoading,
        error: usersError,
    } = useSelector((state) => state.users.usersList);

    const [teacherId, setTeacherId] = useState("");
    const [teacherSearch, setTeacherSearch] = useState("");

    useEffect(() => {
        dispatch(
            getUsers({
                page: 1,
                limit: 100,
                role: "teacher",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            dispatch(setErrorAlert(error?.message || "An error occurred"));
        }

        if (message) {
            dispatch(setSuccessAlert(message));

            onAssigned?.();
            onClose();
        }

        return () => {
            dispatch(clearAssignTeacherAlerts());
        };
    }, [dispatch, message, error, onClose, onAssigned]);

    const teachers = (usersData?.users || []).filter(
        (user) => user.role === "teacher"
    );

    const handleTeacherChange = (e) => {
        const value = e.target.value;

        setTeacherSearch(value);

        const teacher = teachers.find(
            (user) => user.fullName === value || user.email === value
        );

        setTeacherId(teacher?._id || "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            assignTeacherToClass({
                classId,
                teacherId,
            })
        );
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Teacher Assignment
                </p>

                <div className="mt-3">
                    <label className="mb-1 block text-xs font-medium text-slate-500">
                        Teacher
                    </label>

                    <input
                        type="text"
                        list="teachers"
                        value={teacherSearch}
                        onChange={handleTeacherChange}
                        placeholder="Search teacher by full name or email"
                        disabled={usersLoading}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
                    />

                    <datalist id="teachers">
                        {teachers.map((teacher) => (
                            <option key={teacher._id} value={teacher.fullName}>
                                {teacher.email}
                            </option>
                        ))}
                    </datalist>

                    {error?.errors?.teacherId && (
                        <InputError message={error.errors.teacherId} />
                    )}

                    {usersError && (
                        <div className="mt-2">
                            <InputError
                                message={usersError?.message || usersError}
                            />
                        </div>
                    )}
                </div>
            </div>

            <button
                type="submit"
                disabled={assigning || usersLoading || !teacherId}
                className="w-full cursor-pointer rounded-md bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {assigning ? <InputLoading /> : "Assign Teacher"}
            </button>
        </form>
    );
}
