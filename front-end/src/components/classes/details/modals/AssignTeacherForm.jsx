import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputError from "../../../global/InputError";
import InputLoading from "../../../global/InputLoading";

import { assignTeacherToClass } from "../../../../store/slices/classes.slice";

import { getUsers } from "../../../../store/slices/users.slice";

import {
    setErrorAlert,
    setSuccessAlert,
} from "../../../../store/slices/alert.slice";

export default function AssignTeacherForm({ classId, onClose, onAssigned }) {
    const dispatch = useDispatch();

    const {
        data: usersData,
        loading,
        error,
    } = useSelector((state) => state.users.usersList);

    const [teacherId, setTeacherId] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        dispatch(
            getUsers({
                page: 1,
                limit: 100,
                role: "teacher",
            })
        );
    }, [dispatch]);

    const teachers = usersData?.users || [];

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!teacherId) {
            return;
        }

        try {
            setSubmitting(true);

            const response = await dispatch(
                assignTeacherToClass({
                    classId,
                    teacherId,
                })
            ).unwrap();

            dispatch(setSuccessAlert(response.message));

            onAssigned?.();
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
                    Teacher
                </label>

                <select
                    value={teacherId}
                    onChange={(event) => setTeacherId(event.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                    <option value="">Select a teacher</option>

                    {teachers.map((teacher) => (
                        <option key={teacher._id} value={teacher._id}>
                            {teacher.fullName}
                        </option>
                    ))}
                </select>

                {error && <InputError message={error?.message || error} />}
            </div>

            <button
                type="submit"
                disabled={!teacherId || submitting || loading}
                className="w-full rounded-md bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60 cursor-pointer"
            >
                {submitting ? <InputLoading /> : "Assign Teacher"}
            </button>
        </form>
    );
}
