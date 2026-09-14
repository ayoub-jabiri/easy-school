const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const scheduleData = [
    {
        time: "8:00 AM",
        endTime: "8:45 AM",
        slots: {
            Mon: { subject: "Math", color: "sky" },
            Wed: { subject: "Math", color: "sky" },
            Fri: { subject: "Math", color: "amber" },
        },
    },
    {
        time: "9:00 AM",
        endTime: "9:45 AM",
        slots: {
            Mon: { subject: "English", color: "sky" },
            Tue: { subject: "English", color: "sky" },
            Thu: { subject: "English", color: "sky" },
            Fri: { subject: "English", color: "amber" },
        },
    },
    {
        time: "10:00 AM",
        endTime: "10:45 AM",
        slots: {
            Mon: { subject: "Biology", color: "sky" },
            Tue: { subject: "English", color: "amber" },
            Wed: { subject: "Music", color: "sky" },
            Thu: { subject: "Biology", color: "amber" },
        },
    },
    {
        time: "11:00 AM",
        endTime: "11:45 AM",
        slots: {
            Mon: { subject: "Physics", color: "sky" },
            Tue: { subject: "History", color: "violet" },
            Thu: { subject: "Physics", color: "sky" },
            Fri: { subject: "Music", color: "sky" },
        },
    },
    {
        time: "1:00 PM",
        endTime: "1:45 PM",
        slots: {
            Mon: { subject: "Chemistry", color: "sky" },
            Wed: { subject: "Chemistry", color: "sky" },
            Fri: { subject: "Chemistry", color: "sky" },
        },
    },
    {
        time: "2:00 PM",
        endTime: "2:45 PM",
        slots: {
            Mon: { subject: "History", color: "amber" },
            Tue: { subject: "Geography", color: "sky" },
            Wed: { subject: "Physics", color: "sky" },
            Thu: { subject: "History", color: "sky" },
        },
    },
];

const colorClasses = {
    sky: "bg-sky-50 text-sky-700",
    amber: "bg-amber-50 text-amber-700",
    violet: "bg-violet-50 text-violet-700",
};

export default function Schedule({ className = "" }) {
    return (
        <div className={`rounded-2xl bg-white p-5 shadow-sm ${className}`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-base font-bold text-slate-900">
                    Schedule (4A)
                </h3>

                <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-400">
                        August 19 – 23
                    </span>
                </div>
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
                        {scheduleData.map((row) => (
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
