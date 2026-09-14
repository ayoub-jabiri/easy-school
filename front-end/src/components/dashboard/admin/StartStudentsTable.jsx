import Avatar from "../../global/Avatar";

const starStudents = [
    {
        name: "John Doe",
        email: "john@doe.com",
        id: "7419380756",
        grade: "5th Grade",
        class: "5A",
        phone: "7283941",
        address: "512 Main St, Anytown, USA",
    },
    {
        name: "Dean Guerrero",
        email: "elmer@doe.com",
        id: "2304567890",
        grade: "4th Grade",
        class: "4B",
        phone: "8027856",
        address: "597 Main St, Anytown, USA",
    },
    {
        name: "Mike Geller",
        email: "mike@geller.com",
        id: "5534567890",
        grade: "3rd Grade",
        class: "3C",
        phone: "2744534",
        address: "841 Main St, Anytown, USA",
    },
    {
        name: "Jay French",
        email: "jay@gmail.com",
        id: "7844567890",
        grade: "5th Grade",
        class: "5A",
        phone: "5481430",
        address: "997 Main St, Anytown, USA",
        highlighted: true,
    },
    {
        name: "Jane Smith",
        email: "jane@gmail.com",
        id: "1254567890",
        grade: "4th Grade",
        class: "4B",
        phone: "7401901",
        address: "209 Main St, Anytown, USA",
    },
];

export default function StartStudentsTable() {
    return (
        <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-base font-bold text-slate-900">
                    Star Students
                </h3>
            </div>

            <div className="mt-5 overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="text-xs font-medium text-slate-400">
                            <th className="pb-3 pr-4">Info</th>
                            <th className="pb-3 pr-4">Student ID</th>
                            <th className="pb-3 pr-4">Grade</th>
                            <th className="pb-3 pr-4">Class</th>
                            <th className="pb-3 pr-4">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {starStudents.map((student) => (
                            <tr
                                key={student.id}
                                className="border-t border-slate-50 text-sm hover:bg-violet-50"
                            >
                                <td className="py-3 pr-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar name={student.name} />
                                        <div>
                                            <p className="font-semibold text-slate-800">
                                                {student.name}
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                {student.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 pr-4 text-slate-600">
                                    {student.id}
                                </td>
                                <td className="py-3 pr-4 text-slate-600">
                                    {student.grade}
                                </td>
                                <td className="py-3 pr-4 text-slate-600">
                                    {student.class}
                                </td>
                                <td className="py-3 pr-4 text-slate-600">
                                    {student.phone}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
