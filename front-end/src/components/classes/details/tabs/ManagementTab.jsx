import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Modal from "../../../global/Modal";
import ConfirmModal from "../../../global/ConfirmModal";
import UpdateClassForm from "../../UpdateClassForm";

import {
    clearClassDeleteError,
    clearClassDeleteMessage,
    deleteClass,
    getClassById,
} from "../../../../store/slices/classes.slice";

import {
    setErrorAlert,
    setSuccessAlert,
} from "../../../../store/slices/alert.slice";

export default function ManagementTab({ classId, classData }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { deleting, message, error } = useSelector(
        (state) => state.classes.deleteData
    );

    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    useEffect(() => {
        if (message) {
            dispatch(setSuccessAlert(message));

            navigate("/classes");
        }

        if (error) {
            dispatch(setErrorAlert(error?.message));
        }

        return () => {
            dispatch(clearClassDeleteMessage());
            dispatch(clearClassDeleteError());
        };
    }, [dispatch, message, error, navigate]);

    const handleDelete = async () => {
        dispatch(deleteClass(classId));
    };

    const handleUpdated = () => {
        dispatch(getClassById(classId));
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <button
                    type="button"
                    onClick={() => setIsUpdateOpen(true)}
                    className="rounded-xl border border-slate-200 p-5 text-left transition hover:border-sky-300 hover:bg-sky-50 cursor-pointer"
                >
                    <Pencil className="h-5 w-5 text-sky-600" />

                    <p className="mt-3 text-sm font-bold text-slate-900">
                        Update Class
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                        Update level, year, group, subject, and room.
                    </p>
                </button>

                <button
                    type="button"
                    onClick={() => setIsDeleteOpen(true)}
                    className="rounded-xl border border-red-100 p-5 text-left transition hover:bg-red-50 cursor-pointer"
                >
                    <Trash2 className="h-5 w-5 text-red-600" />

                    <p className="mt-3 text-sm font-bold text-slate-900">
                        Delete Class
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                        Permanently remove this class.
                    </p>
                </button>
            </div>

            {isUpdateOpen && (
                <Modal
                    isOpen={isUpdateOpen}
                    onClose={() => setIsUpdateOpen(false)}
                    title="Update Class"
                >
                    <UpdateClassForm
                        onClose={() => setIsUpdateOpen(false)}
                        onUpdated={handleUpdated}
                        classToUpdate={classData}
                    />
                </Modal>
            )}

            <ConfirmModal
                isOpen={isDeleteOpen}
                onClose={() => (deleting ? null : setIsDeleteOpen(false))}
                onConfirm={handleDelete}
                title="Delete Class"
                message="Are you sure you want to delete this class? This action cannot be undone."
                confirmLabel="Delete"
                loading={deleting}
            />
        </>
    );
}
