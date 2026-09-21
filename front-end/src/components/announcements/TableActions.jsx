import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleTableActions } from "../../store/slices/announcements.slice";
import CreateAnnouncementModal from "./CreateAnnouncementModal";

export default function TableActions() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { search, startDate, endDate } = useSelector(
        (state) => state.announcements.announcementsList.tableActions
    );

    const isAdmin = user?.role === "admin";

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    return (
        <>
            <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
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
                        placeholder="Search by title or description..."
                        className="w-64 rounded-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-600 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <div className="relative">
                    <button
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600 transition hover:bg-sky-200 cursor-pointer"
                        onClick={() => setIsFilterOpen((open) => !open)}
                        title="Filter by date"
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                    </button>

                    {isFilterOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsFilterOpen(false)}
                            />

                            <div className="absolute right-0 z-20 mt-2 w-64 rounded-xl border border-slate-100 bg-white p-3 shadow-lg">
                                <p className="mb-2 text-xs font-semibold text-slate-400">
                                    Filter by date
                                </p>

                                <div className="space-y-2">
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-slate-500">
                                            From
                                        </label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) =>
                                                dispatch(
                                                    handleTableActions({
                                                        key: "startDate",
                                                        value: e.target.value,
                                                    })
                                                )
                                            }
                                            className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-slate-500">
                                            To
                                        </label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) =>
                                                dispatch(
                                                    handleTableActions({
                                                        key: "endDate",
                                                        value: e.target.value,
                                                    })
                                                )
                                            }
                                            className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>

                                    {(startDate || endDate) && (
                                        <button
                                            onClick={() => {
                                                dispatch(
                                                    handleTableActions({
                                                        key: "startDate",
                                                        value: "",
                                                    })
                                                );
                                                dispatch(
                                                    handleTableActions({
                                                        key: "endDate",
                                                        value: "",
                                                    })
                                                );
                                            }}
                                            className="text-xs font-medium text-slate-500 hover:text-slate-700 cursor-pointer"
                                        >
                                            Clear dates
                                        </button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {isAdmin && (
                    <button
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-white transition hover:bg-amber-500 cursor-pointer"
                        onClick={() => setIsCreateOpen(true)}
                        title="Create new announcement"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                )}
            </div>

            {isAdmin && (
                <CreateAnnouncementModal
                    isOpen={isCreateOpen}
                    onClose={() => setIsCreateOpen(false)}
                />
            )}
        </>
    );
}
