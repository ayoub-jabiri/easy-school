import { Link } from "react-router";
import CardShell from "../CardShell";
import Avatar from "../../global/Avatar";

const latestGrades = [
    {
        student: "John Doe",
        subject: "Mathematics",
        grade: "A",
        score: "94/100",
        date: "2025-01-08",
    },
    {
        student: "Jane Smith",
        subject: "History",
        grade: "B+",
        score: "87/100",
        date: "2025-01-07",
    },
    {
        student: "Mike Geller",
        subject: "Biology",
        grade: "A-",
        score: "91/100",
        date: "2025-01-06",
    },
];

export default function LatestGrades() {
    return (
        <CardShell
            title="Latest Grades"
            action={
                <Link
                    to="/grades"
                    className="text-xs font-medium text-slate-400 hover:text-slate-600"
                >
                    View All
                </Link>
            }
        >
            <div className="mt-4 flex flex-col gap-3">
                {latestGrades.map((item) => (
                    <div
                        key={`${item.student}-${item.subject}`}
                        className="flex items-center justify-between rounded-lg bg-slate-50 p-3"
                    >
                        <div className="flex items-center gap-3">
                            <Avatar name={item.student} />
                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    {item.student}
                                </p>
                                <p className="text-xs text-slate-400">
                                    {item.subject} &middot; {item.date}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-slate-900">
                                {item.grade}
                            </p>
                            <p className="text-xs text-slate-400">
                                {item.score}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </CardShell>
    );
}
