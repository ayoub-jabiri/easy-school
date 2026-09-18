import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { registerStudentToClass } from "../../store/slices/classes.slice";
import { getUsers } from "../../store/slices/users.slice";

import InputError from "../global/InputError";
import InputLoading from "../global/InputLoading";

export default function RegisterStudentModal({ classId, onClose }) {
    const dispatch = useDispatch();

    const { data, loading } = useSelector((state) => state.users.usersList);

    const { registering, error } = useSelector(
        (state) => state.classes.studentRegistrationData
    );

    const [studentId, setStudentId] = useState("");

    useEffect(() => {
        dispatch(
            getUsers({
                role: "student",
                page: 1,
                limit: 100,
            })
        );
    }, [dispatch]);

    const students = data?.users || [];

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
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">
                    Student
                </label>

                <select
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                    <option value="">Select a student</option>

                    {students.map((student) => (
                        <option key={student._id} value={student._id}>
                            {student.fullName} — {student.email}
                        </option>
                    ))}
                </select>

                {error && <InputError message={error.message} />}
            </div>

            <button
                type="submit"
                disabled={!studentId || registering || loading}
                className="w-full rounded-md bg-slate-900 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
                {registering ? <InputLoading /> : "Register Student"}
            </button>
        </form>
    );
}
