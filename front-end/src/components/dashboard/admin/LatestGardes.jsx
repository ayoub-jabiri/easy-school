import { Link } from "react-router";
import CardShell from "../CardShell";
import Avatar from "../../global/Avatar";
import NoDataAvailable from "../../global/NoDataAvailable";

export default function LatestGrades({ data }) {
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
                {!data.length && (
                    <NoDataAvailable message="No grades available." />
                )}

                {data.length > 0 &&
                    data.map((item) => (
                        <Link
                            to={`grades/${item._id}`}
                            key={item._id}
                            className="flex items-center justify-between rounded-lg bg-slate-50 p-3"
                        >
                            <div className="flex items-center gap-3">
                                <Avatar name={item.studentId.fullName} />
                                <div>
                                    <p className="text-sm font-semibold text-slate-800 hover:underline">
                                        {item.studentId.fullName}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        {item.classId.subjectTitle} &middot;{" "}
                                        {item.createdAt.split("T")[0]}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-slate-900 capitalize">
                                    {item.grade}
                                </p>
                                <p className="text-xs text-slate-400">
                                    {item.evaluation}
                                </p>
                            </div>
                        </Link>
                    ))}
            </div>
        </CardShell>
    );
}
