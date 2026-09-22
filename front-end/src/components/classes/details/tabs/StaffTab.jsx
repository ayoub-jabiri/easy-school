import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NoDataAvailable from "../../../global/NoDataAvailable";
import Modal from "../../../global/Modal";

import AssignTeacherForm from "../modals/AssignTeacherForm";

import {
    clearAssignTeacherAlerts,
    unassignTeacherFromClass,
} from "../../../../store/slices/classes.slice";

import {
    setErrorAlert,
    setSuccessAlert,
} from "../../../../store/slices/alert.slice";
import { useEffect } from "react";

export default function StaffTab({ isAdmin, classId, classData }) {
    const dispatch = useDispatch();
    const { assigning, message, error } = useSelector(
        (state) => state.classes.teacherAssignmentData
    );

    const [isAssignOpen, setIsAssignOpen] = useState(false);

    useEffect(() => {
        if (message) {
            dispatch(setSuccessAlert(message));
        }

        if (error) {
            dispatch(setErrorAlert(error?.message || "An error occurred"));
        }

        return () => {
            dispatch(clearAssignTeacherAlerts());
        };
    }, [dispatch, message, error]);

    const handleUnassign = async () => {
        dispatch(unassignTeacherFromClass(classId));
    };

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-100 p-5">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold text-slate-900">
                        Teacher
                    </h2>

                    {isAdmin &&
                        (classData?.teacherId ? (
                            <button
                                type="button"
                                onClick={handleUnassign}
                                disabled={assigning}
                                className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-200 disabled:opacity-60 cursor-pointer"
                            >
                                {assigning ? "Unassigning..." : "Unassign"}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setIsAssignOpen(true)}
                                className="rounded-lg bg-sky-100 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-200 cursor-pointer"
                            >
                                Assign
                            </button>
                        ))}
                </div>

                <div className="mt-4 rounded-xl bg-slate-50 p-4">
                    {classData?.teacherId ? (
                        <>
                            <p className="font-semibold text-slate-800">
                                {classData?.teacherId?.fullName}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                {classData?.teacherId?.email}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                {classData?.teacherId?.phoneNumber || "—"}
                            </p>
                        </>
                    ) : (
                        <NoDataAvailable message="No teacher assigned." />
                    )}
                </div>
            </div>

            <div className="rounded-xl border border-slate-100 p-5">
                <h2 className="text-sm font-bold text-slate-900">Subject</h2>

                <div className="mt-4 rounded-xl bg-slate-50 p-4">
                    {classData?.subjectId ? (
                        <p className="font-semibold capitalize text-slate-800">
                            {classData?.subjectId?.title || "Unknown Subject"}
                        </p>
                    ) : (
                        <NoDataAvailable message="No subject assigned." />
                    )}
                </div>
            </div>

            {isAdmin && isAssignOpen && (
                <Modal
                    isOpen={isAssignOpen}
                    onClose={() => setIsAssignOpen(false)}
                    title="Assign Teacher"
                >
                    <AssignTeacherForm
                        classId={classId}
                        onClose={() => setIsAssignOpen(false)}
                    />
                </Modal>
            )}
        </div>
    );
}
