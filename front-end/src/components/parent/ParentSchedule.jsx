const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const colorClasses = {
    sky: "bg-sky-50 text-sky-700",
    amber: "bg-amber-50 text-amber-700",
    violet: "bg-violet-50 text-violet-700",
};

export default function ParentSchedule({
    child,
    schedule,
    children,
    selectedChildId,
    onChildChange,
}) {
    return (
        <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-base font-bold text-slate-900">
                        Schedule ({child.className})
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">{child.name}</p>
                </div>

                <div className="flex flex-col gap-2 sm:items-end">
                    <label
                        htmlFor="child-select"
                        className="text-xs font-medium text-slate-500"
                    >
                        Child
                    </label>

                    <select
                        id="child-select"
                        value={selectedChildId}
                        onChange={(e) => onChildChange(Number(e.target.value))}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                        {children.map((childOption) => (
                            <option key={childOption.id} value={childOption.id}>
                                {childOption.name} — {childOption.className}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-5 flex items-center justify-end">
                <span className="text-sm text-slate-400">{schedule.dates}</span>
            </div>

            <div className="mt-5 overflow-x-auto">
                <div className="min-w-[640px]">
                    <div className="grid grid-cols-[70px_repeat(5,1fr)] gap-2">
                        <div />

                        {days.map((day) => (
                            <div
                                key={day}
                                className="pb-2 text-center text-xs font-semibold text-slate-400"
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2">
                        {schedule.scheduleData.map((row) => (
                            <div
                                key={row.time}
                                className="grid grid-cols-[70px_repeat(5,1fr)] gap-2"
                            >
                                <div className="flex items-start pt-2 text-xs font-medium text-slate-400">
                                    {row.time}
                                </div>

                                {days.map((day) => {
                                    const slot = row.slots[day];

                                    return (
                                        <div
                                            key={day}
                                            className={`min-h-16 rounded-lg p-2 ${
                                                slot
                                                    ? colorClasses[slot.color]
                                                    : "bg-slate-50"
                                            }`}
                                        >
                                            {slot && (
                                                <>
                                                    <p className="text-[10px] opacity-70">
                                                        {row.time} –{" "}
                                                        {row.endTime}
                                                    </p>

                                                    <p className="mt-0.5 text-xs font-semibold">
                                                        {slot.subject}
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
