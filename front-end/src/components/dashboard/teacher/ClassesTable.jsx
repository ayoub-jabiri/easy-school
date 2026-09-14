const myClasses = [
    {
        name: "4A",
        subject: "Mathematics",
        students: 28,
        room: "Room 12",
        schedule: "Mon, Wed, Fri",
    },
    {
        name: "4B",
        subject: "Mathematics",
        students: 26,
        room: "Room 12",
        schedule: "Tue, Thu",
    },
    {
        name: "5A",
        subject: "Mathematics",
        students: 30,
        room: "Room 14",
        schedule: "Mon, Wed",
    },
    {
        name: "3C",
        subject: "Mathematics",
        students: 24,
        room: "Room 09",
        schedule: "Tue, Fri",
    },
];

export default function ClassesTable() {
    return (
        <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-base font-bold text-slate-900">
                    My Classes
                </h3>
            </div>

            <div className="mt-5 overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="text-xs font-medium text-slate-400">
                            <th className="pb-3 pr-4">Class</th>
                            <th className="pb-3 pr-4">Subject</th>
                            <th className="pb-3 pr-4">Students</th>
                            <th className="pb-3 pr-4">Room</th>
                            <th className="pb-3 pr-4">Schedule</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myClasses.map((cls) => (
                            <tr
                                key={cls.name}
                                className="border-t border-slate-50 text-sm hover:bg-violet-50"
                            >
                                <td className="py-3 pr-4 font-semibold text-slate-800">
                                    {cls.name}
                                </td>
                                <td className="py-3 pr-4 text-slate-600">
                                    {cls.subject}
                                </td>
                                <td className="py-3 pr-4 text-slate-600">
                                    {cls.students}
                                </td>
                                <td className="py-3 pr-4 text-slate-600">
                                    {cls.room}
                                </td>
                                <td className="py-3 pr-4 text-slate-600">
                                    {cls.schedule}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
