import {
    Bar,
    BarChart,
    CartesianGrid,
    RadialBar,
    RadialBarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import CardShell from "../CardShell";
import { User } from "lucide-react";

const studentsData = [
    { name: "Boys", value: 1234, fill: "#7dd3fc" },
    { name: "Girls", value: 1134, fill: "#fde047" },
];

const attendanceData = [
    { day: "Mon", present: 60, absent: 45 },
    { day: "Tue", present: 55, absent: 60 },
    { day: "Wed", present: 88, absent: 55 },
    { day: "Thu", present: 65, absent: 70 },
    { day: "Fri", present: 55, absent: 60 },
];

export default function Charts() {
    return (
        <div className="grid grid-cols-12 gap-6 ">
            <CardShell title="Students" className="col-span-12 lg:col-span-5">
                <div className="relative mx-auto mt-4 h-48 w-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                            innerRadius="70%"
                            outerRadius="100%"
                            data={studentsData}
                            startAngle={90}
                            endAngle={-270}
                        >
                            <RadialBar
                                dataKey="value"
                                background
                                cornerRadius={20}
                            />
                        </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-3xl">
                        <User />
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-center gap-8">
                    <div className="text-center">
                        <span className="mx-auto mb-1 block h-2.5 w-2.5 rounded-full bg-sky-300" />
                        <p className="text-sm font-bold text-slate-800">
                            1,234
                        </p>
                        <p className="text-xs text-slate-400">Boys (55%)</p>
                    </div>
                    <div className="text-center">
                        <span className="mx-auto mb-1 block h-2.5 w-2.5 rounded-full bg-yellow-300" />
                        <p className="text-sm font-bold text-slate-800">
                            1,134
                        </p>
                        <p className="text-xs text-slate-400">Girls (45%)</p>
                    </div>
                </div>
            </CardShell>

            <CardShell title="Attendance" className="col-span-12 lg:col-span-7">
                <div className="mb-2 mt-2 flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-yellow-300" />
                        present
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-sky-300" />
                        absent
                    </span>
                </div>
                <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={attendanceData} barGap={6}>
                            <CartesianGrid vertical={false} stroke="#f1f5f9" />
                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fontSize: 12,
                                    fill: "#94a3b8",
                                }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fontSize: 12,
                                    fill: "#94a3b8",
                                }}
                            />
                            <Tooltip cursor={{ fill: "transparent" }} />
                            <Bar
                                dataKey="present"
                                fill="#fde047"
                                radius={[6, 6, 0, 0]}
                                barSize={16}
                            />
                            <Bar
                                dataKey="absent"
                                fill="#7dd3fc"
                                radius={[6, 6, 0, 0]}
                                barSize={16}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardShell>
        </div>
    );
}
