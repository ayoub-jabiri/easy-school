import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import CardShell from "../CardShell";

export default function Charts({ data, total = 30, occupied = 22 }) {
    const studentsData = [
        { name: "Boys", value: data?.boys || 0, fill: "#fde047" },
        { name: "Girls", value: data?.girls || 0, fill: "#7dd3fc" },
    ];

    function getGenderPercentage(value) {
        if (value) {
            return `${(value * 100) / data?.students}`.includes(".")
                ? ((value * 100) / data?.students).toFixed(2)
                : (value * 100) / data?.students;
        } else {
            return "N/A";
        }
    }

    const available = Math.max(0, total - occupied);

    const classroomData = [
        { name: "Occupied", value: occupied, color: "#ff8904" },
        { name: "Available", value: available, color: "#fef3c6" },
    ];

    return (
        <div className="grid grid-cols-12 gap-6 ">
            <CardShell
                title="Students Distribution"
                className="col-span-12 lg:col-span-6"
            >
                <div className="relative mx-auto mt-4 h-48 w-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={studentsData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius="65%"
                                outerRadius="90%"
                                paddingAngle={3}
                                startAngle={90}
                                endAngle={-270}
                            >
                                {studentsData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.fill}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-slate-800">
                            {data?.students || "N/A"}
                        </span>
                        <span className="text-xs text-slate-400">
                            Total Students
                        </span>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-8">
                    <div className="text-center">
                        <span className="mx-auto mb-1 block h-2.5 w-2.5 rounded-full bg-sky-300" />
                        <p className="text-sm font-bold text-slate-800">
                            {data?.girls || "N/A"}
                        </p>
                        <p className="text-xs text-slate-400">
                            Girls ({getGenderPercentage(data?.girls)}
                            %)
                        </p>
                    </div>
                    <div className="text-center">
                        <span className="mx-auto mb-1 block h-2.5 w-2.5 rounded-full bg-yellow-300" />
                        <p className="text-sm font-bold text-slate-800">
                            {data?.boys || "N/A"}
                        </p>
                        <p className="text-xs text-slate-400">
                            Boys ({getGenderPercentage(data?.boys)}%)
                        </p>
                    </div>
                </div>
            </CardShell>
            <CardShell
                title="Classroom Status"
                className="col-span-12 lg:col-span-6"
            >
                <div className="relative mx-auto mt-4 h-48 w-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={classroomData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius="65%"
                                outerRadius="90%"
                                paddingAngle={3}
                                startAngle={90}
                                endAngle={-270}
                            >
                                {classroomData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-slate-800">
                            {total}
                        </span>
                        <span className="text-xs text-slate-400">
                            Total Rooms
                        </span>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-8">
                    <div className="text-center">
                        <span className="mx-auto mb-1 block h-2.5 w-2.5 rounded-full bg-[#fef3c6]" />
                        <p className="text-sm font-bold text-slate-800">
                            {available}
                        </p>
                        <p className="text-xs text-slate-400">Available</p>
                    </div>
                    <div className="text-center">
                        <span className="mx-auto mb-1 block h-2.5 w-2.5 rounded-full bg-[#ff8904]" />
                        <p className="text-sm font-bold text-slate-800">
                            {occupied}
                        </p>
                        <p className="text-xs text-slate-400">Occupied</p>
                    </div>
                </div>
            </CardShell>
        </div>
    );
}
