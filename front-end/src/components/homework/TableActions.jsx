import { Check, Plus, Search, SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleTableActions } from "../../store/slices/homework.slice";
import { getClasses } from "../../store/slices/classes.slice";
import CreateHomeworkModal from "./CreateHomeworkModal";

const statusOptions = [
    { value: "", label: "All statuses" },
    { value: "active", label: "Active" },
    { value: "expired", label: "Expired" },
];

export default function TableActions() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { search, classId, status } = useSelector(
        (state) => state.homework.homeworksList.tableActions
    );
    const { data: classesData } = useSelector(
        (state) => state.classes.classesList
    );

    const isTeacher = user?.role === "teacher";

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    useEffect(() => {
        dispatch(getClasses({ limit: 100 }));
    }, [dispatch]);

    let filterableClasses = [];

    if (isTeacher) {
        filterableClasses =
            classesData?.classes?.filter(
                (currentClass) => currentClass.teacherId?._id === user?._id
            ) || [];
    } else if (user?.role === "student") {
        filterableClasses =
            classesData?.classes?.filter((currentClass) =>
                currentClass.students?.some(
                    (student) => student._id === user?._id
                )
            ) || [];
    } else if (user?.role === "admin") {
        filterableClasses = classesData?.classes || [];
    }

    return (
        <>
            <div className="flex flex-wrap items-center gap-2 max-md:flex-col max-md:items-end">
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
                        placeholder="Search by title..."
                        className="w-56 max-md:w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-600 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                {user?.role !== "parent" && (
                    <select
                        value={classId}
                        onChange={(e) =>
                            dispatch(
                                handleTableActions({
                                    key: "classId",
                                    value: e.target.value,
                                })
                            )
                        }
                        className="w-32.5 max-md:w-full rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    >
                        <option value="">All Classes</option>
                        {filterableClasses.map((currentClass) => (
                            <option
                                key={currentClass._id}
                                value={currentClass._id}
                            >
                                {currentClass.subjectId?.title} —{" "}
                                {currentClass.level} Year{" "}
                                {currentClass.levelYear} (Group{" "}
                                {currentClass.group})
                            </option>
                        ))}
                    </select>
                )}

                <div className="flex gap-3">
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
                                        Filter by Status
                                    </p>

                                    {statusOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                dispatch(
                                                    handleTableActions({
                                                        key: "status",
                                                        value: option.value,
                                                    })
                                                );
                                                setIsFilterOpen(false);
                                            }}
                                            className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm transition hover:bg-slate-50 cursor-pointer ${
                                                status === option.value
                                                    ? "font-semibold text-slate-900"
                                                    : "text-slate-600"
                                            }`}
                                        >
                                            {option.label}
                                            {status === option.value && (
                                                <Check className="h-3.5 w-3.5 text-sky-500" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {isTeacher && (
                        <button
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-white transition hover:bg-amber-500 cursor-pointer"
                            onClick={() => setIsCreateOpen(true)}
                            title="Create new homework"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>

            {isTeacher && (
                <CreateHomeworkModal
                    isOpen={isCreateOpen}
                    onClose={() => setIsCreateOpen(false)}
                />
            )}
        </>
    );
}
