import { ArrowUpDown, Plus, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import RegisterUserForm from "./RegisterUserForm";
import Modal from "../global/Modal";

export default function TableActions() {
    const [search, setSearch] = useState("");
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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

                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-600 transition hover:bg-amber-200 cursor-pointer">
                    <SlidersHorizontal className="h-4 w-4" />
                </button>

                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600 transition hover:bg-sky-200 cursor-pointer">
                    <ArrowUpDown className="h-4 w-4" />
                </button>

                <button
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-white transition hover:bg-amber-500 cursor-pointer"
                    onClick={() => setIsRegisterOpen(true)}
                    title="Register new user"
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>

            {/* {isRegisterOpen && (
                <RegisterUserModal
                    isOpen={isRegisterOpen}
                    onClose={() => setIsRegisterOpen(false)}
                />
            )} */}

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
