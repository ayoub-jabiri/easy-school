import { Link } from "react-router";
import CardShell from "../CardShell";
import NoDataAvailable from "../../global/NoDataAvailable";

export default function LatestAnnouncements({ data }) {
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
                {!data.length && (
                    <NoDataAvailable message="No announcements available." />
                )}

                {data.length > 0 &&
                    data.map((item) => (
                        <Link
                            to={`/announcements/${item._id}`}
                            key={item.title}
                            className="rounded-lg p-3 bg-violet-50"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-slate-800 hover:underline">
                                    {item.title}
                                </p>
                                <span className="text-xs text-slate-400">
                                    {item.createdAt.split("T")[0]}
                                </span>
                            </div>
                            <p className="mt-1 text-xs text-slate-500">
                                {item.description}
                            </p>
                        </Link>
                    ))}
            </div>
        </CardShell>
    );
}
