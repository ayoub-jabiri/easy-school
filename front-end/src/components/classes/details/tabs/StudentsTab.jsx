import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NoDataAvailable from "../../../global/NoDataAvailable";
import Modal from "../../../global/Modal";
import ConfirmModal from "../../../global/ConfirmModal";

import RegisterStudentForm from "../modals/RegisterStudentForm";

import {
    clearAssignStudentAlerts,
    unregisterStudentFromClass,
} from "../../../../store/slices/classes.slice";

import {
    setErrorAlert,
    setSuccessAlert,
} from "../../../../store/slices/alert.slice";
import { useEffect } from "react";

export default function StudentsTab({ isAdmin, classId }) {
    const dispatch = useDispatch();

    const { data } = useSelector((state) => state.classes.classDetails);
    const { registering, message, error } = useSelector(
        (state) => state.classes.studentRegistrationData
    );

    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [studentToRemove, setStudentToRemove] = useState(null);

    useEffect(() => {
        if (message) {
            dispatch(setSuccessAlert(message));
        }

        if (error) {
            dispatch(setErrorAlert(error?.message || "An error occurred"));
        }

        return () => {
            dispatch(clearAssignStudentAlerts());
        };
    }, [dispatch, message, error]);

    const handleRemove = async () => {
        dispatch(
            unregisterStudentFromClass({
                classId,
                studentId: studentToRemove._id,
            })
        );

        setStudentToRemove(null);
    };

    return (
        <>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-sm font-bold text-slate-900">
                        Enrolled Students
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                        {data?.students?.length || 0} students enrolled
                    </p>
                </div>

                {isAdmin && (
                    <button
                        type="button"
                        onClick={() => setIsRegisterOpen(true)}
                        className="rounded-lg bg-violet-100 px-3 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-200 cursor-pointer"
                    >
                        Register Student
                    </button>
                )}
            </div>

            <div className="mt-5 overflow-x-auto">
                {data?.students?.length > 0 ? (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs text-slate-400">
                                <th className="pb-3">Student</th>

                                <th className="pb-3">Email</th>

                                <th className="pb-3">Phone</th>

                                {isAdmin && <th className="pb-3">Actions</th>}
                            </tr>
                        </thead>

                        <tbody>
                            {data?.students?.map((student) => (
                                <tr
                                    key={student._id}
                                    className="border-t border-slate-50 text-sm"
                                >
                                    <td className="py-3 font-semibold text-slate-700">
                                        {student.fullName}
                                    </td>

                                    <td className="py-3 text-slate-500">
                                        {student.email}
                                    </td>

                                    <td className="py-3 text-slate-500">
                                        {student.phoneNumber || "—"}
                                    </td>

                                    {isAdmin && (
                                        <td className="py-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setStudentToRemove(student)
                                                }
                                                className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-200 cursor-pointer"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <NoDataAvailable message="No students enrolled." />
                )}
            </div>

            {isAdmin && isRegisterOpen && (
                <Modal
                    isOpen={isRegisterOpen}
                    onClose={() => setIsRegisterOpen(false)}
                    title="Register Student"
                >
                    <RegisterStudentForm
                        classId={classId}
                        enrolledStudents={data?.students || []}
                        onClose={() => setIsRegisterOpen(false)}
                    />
                </Modal>
            )}

            {isAdmin && (
                <ConfirmModal
                    isOpen={!!studentToRemove}
                    onClose={() =>
                        registering ? null : setStudentToRemove(null)
                    }
                    onConfirm={handleRemove}
                    title="Remove Student"
                    message={`Are you sure you want to remove ${studentToRemove?.fullName} from this class?`}
                    confirmLabel="Remove"
                    loading={registering}
                />
            )}
        </>
    );
}
