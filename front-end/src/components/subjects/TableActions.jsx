import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleTableActions } from "../../store/slices/subjects.slice";
import RegisterSubjectForm from "./RegisterSubjectForm";
import Modal from "../global/Modal";

export default function TableActions({ isAdmin }) {
    const { search } = useSelector(
        (state) => state.subjects.subjectsList.tableActions
    );
    const dispatch = useDispatch();

    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    return (
        <>
            <div className="flex items-center gap-2 max-md:flex-col max-md:items-end">
                <div className="relative max-md:w-full">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                        value={search}
                        onChange={(e) =>
                            dispatch(
                                handleTableActions({
                                    key: "search",
                                    value: e.target.value,
                                })
                            )
                        }
                        placeholder="Search by subject title..."
                        className="w-70 max-md:w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-600 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                {isAdmin && (
                    <button
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600 transition hover:bg-sky-200 cursor-pointer"
                        onClick={() => setIsRegisterOpen(true)}
                        title="Register new subject"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                )}
            </div>

            {isAdmin && isRegisterOpen && (
                <Modal
                    isOpen={isRegisterOpen}
                    onClose={() => setIsRegisterOpen(false)}
                    title="Register New Subject"
                >
                    <RegisterSubjectForm
                        onClose={() => setIsRegisterOpen(false)}
                    />
                </Modal>
            )}
        </>
    );
}
