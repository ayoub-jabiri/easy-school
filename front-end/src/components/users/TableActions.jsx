import { Check, Plus, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import RegisterUserForm from "./RegisterUserForm";
import Modal from "../global/Modal";
import { useDispatch } from "react-redux";
import { getUsers } from "../../store/slices/users.slice";

export default function TableActions({ targetedRole, setTargetedRole, limit }) {
    const [search, setSearch] = useState("");
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const roleOptions = [
        { value: "", label: "All Roles" },
        { value: "admin", label: "Admin" },
        { value: "teacher", label: "Teacher" },
        { value: "student", label: "Student" },
        { value: "parent", label: "Parent" },
    ];

    const dispatch = useDispatch();

    function handleChangeRoleFilter(value) {
        setTargetedRole(value);
        setIsFilterOpen(false);

        dispatch(getUsers({ role: value, limit }));
    }

    return (
        <>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search from table..."
                        className="w-56 rounded-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-600 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <div className="relative">
                    <button
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600 transition hover:bg-sky-200 cursor-pointer"
                        onClick={() => setIsFilterOpen((open) => !open)}
                        title="Filter"
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                    </button>

                    {isFilterOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsFilterOpen(false)}
                            />

                            <div className="absolute right-0 z-20 mt-2 w-40 rounded-xl border border-slate-100 bg-white p-1.5 shadow-lg">
                                <p className="px-2 pb-1 pt-1 text-xs font-semibold text-slate-400">
                                    Filter by role
                                </p>

                                {roleOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() =>
                                            handleChangeRoleFilter(option.value)
                                        }
                                        className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm transition hover:bg-slate-50 cursor-pointer ${
                                            targetedRole === option.value
                                                ? "font-semibold text-slate-900"
                                                : "text-slate-600"
                                        }`}
                                    >
                                        {option.label}
                                        {targetedRole === option.value && (
                                            <Check className="h-3.5 w-3.5 text-sky-500" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <button
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-white transition hover:bg-amber-500 cursor-pointer"
                    onClick={() => setIsRegisterOpen(true)}
                    title="Register new user"
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>

            {isRegisterOpen && (
                <Modal
                    isOpen={isRegisterOpen}
                    onClose={() => setIsRegisterOpen(false)}
                    title="Register New User"
                >
                    <RegisterUserForm
                        onClose={() => setIsRegisterOpen(false)}
                    />
                </Modal>
            )}
        </>
    );
}
