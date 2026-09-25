import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import CardShell from "../CardShell";
import { School } from "lucide-react";

export default function Chart({ data = null }) {
    console.log(data);

    const chartData = [
        { name: "Classes", value: data?.classes || 0, fill: "#7dd3fc" },
        { name: "Subjects", value: data?.subjects || 0, fill: "#fde047" },
    ];

    return (
        <CardShell title="Classes Status" className="col-span-12 lg:col-span-5">
            <div className="relative mx-auto mt-4 h-48 w-48">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                        innerRadius="70%"
                        outerRadius="100%"
                        data={chartData}
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
                    <School />
                </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-8">
                <div className="text-center">
                    <span className="mx-auto mb-1 block h-2.5 w-2.5 rounded-full bg-sky-300" />
                    <p className="text-sm font-bold text-slate-800">
                        {data?.classes || "N/A"}
                    </p>
                    <p className="text-xs text-slate-400">Classes</p>
                </div>
                <div className="text-center">
                    <span className="mx-auto mb-1 block h-2.5 w-2.5 rounded-full bg-yellow-300" />
                    <p className="text-sm font-bold text-slate-800">
                        {data?.subjects || "N/A"}
                    </p>
                    <p className="text-xs text-slate-400">Subjects</p>
                </div>
            </div>
        </CardShell>
    );
}
