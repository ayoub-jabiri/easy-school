import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputError from "../../../global/InputError";
import InputLoading from "../../../global/InputLoading";

import { registerStudentToClass } from "../../../../store/slices/classes.slice";

import { getUsers } from "../../../../store/slices/users.slice";

import {
    setErrorAlert,
    setSuccessAlert,
} from "../../../../store/slices/alert.slice";

export default function RegisterStudentForm({
    classId,
    enrolledStudents,
    onClose,
}) {
    const dispatch = useDispatch();

    const {
        data: usersData,
        loading,
        error,
    } = useSelector((state) => state.users.usersList);

    const [studentId, setStudentId] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        dispatch(
            getUsers({
                page: 1,
                limit: 100,
                role: "student",
            })
        );
    }, [dispatch]);

    const availableStudents = useMemo(() => {
        const enrolledIds = new Set(
            (enrolledStudents || []).map((student) => student._id.toString())
        );

        return (usersData?.users || []).filter(
            (student) => !enrolledIds.has(student._id.toString())
        );
    }, [usersData, enrolledStudents]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!studentId) {
            return;
        }

        try {
            setSubmitting(true);

            const response = await dispatch(
                registerStudentToClass({
                    classId,
                    studentId,
                })
            ).unwrap();

            dispatch(setSuccessAlert(response.message));

            onClose();
        } catch (error) {
            dispatch(setErrorAlert(error?.message || "An error occurred"));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">
                    Student
                </label>

                <select
                    value={studentId}
                    onChange={(event) => setStudentId(event.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                    <option value="">Select a student</option>

                    {availableStudents.map((student) => (
                        <option key={student._id} value={student._id}>
                            {student.fullName}
                        </option>
                    ))}
                </select>

                {error && <InputError message={error?.message || error} />}

                {!loading && !availableStudents.length && (
                    <p className="mt-2 text-xs text-slate-400">
                        No available students found.
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={!studentId || submitting || loading}
                className="w-full rounded-md bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60 cursor-pointer"
            >
                {submitting ? <InputLoading /> : "Register Student"}
            </button>
        </form>
    );
}
