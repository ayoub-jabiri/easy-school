import { Link } from "react-router";
import CardShell from "../CardShell";

const announcements = [
    {
        title: "About 4A Math Test",
        date: "2025-01-02",
        description:
            "The Math test scheduled for 2nd January has been cancelled. A new date will be announced soon.",
        bg: "bg-violet-50",
    },
    {
        title: "Field Trip Rescheduled",
        date: "2025-01-02",
        description:
            "The field trip to London has been rescheduled. Please check back for updates.",
        bg: "bg-sky-50",
    },
];

export default function LatestAnnouncements() {
    return (
        <CardShell
            title="Announcements"
            action={
                <Link
                    to="/announcements"
                    className="text-xs font-medium text-slate-400 hover:text-slate-600"
                >
                    View All
                </Link>
            }
        >
            <div className="mt-4 flex flex-col gap-3">
                {announcements.map((item) => (
                    <div
                        key={item.title}
                        className={`rounded-lg p-3 ${item.bg}`}
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-slate-800">
                                {item.title}
                            </p>
                            <span className="text-xs text-slate-400">
                                {item.date}
                            </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </CardShell>
    );
}
