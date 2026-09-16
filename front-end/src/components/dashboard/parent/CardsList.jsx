import { GraduationCap, School, Award, ClipboardCheck } from "lucide-react";
import DashboardCard from "../DashboadCard";

export default function CardsList({ stats }) {
    const summaryCards = [
        {
            label: "Students",
            value: stats?.students ?? 0,
            bg: "bg-violet-100",
            icon: <GraduationCap />,
        },
        {
            label: "Classes",
            value: stats?.classes ?? 0,
            bg: "bg-yellow-100",
            icon: <School />,
        },
        {
            label: "Grades",
            value: stats?.grades ?? 0,
            bg: "bg-violet-100",
            icon: <Award />,
        },
        {
            label: "Pending Homework",
            value: stats?.pendingHomeworks ?? 0,
            bg: "bg-yellow-100",
            icon: <ClipboardCheck />,
        },
    ];

    return (
        <div className="col-span-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {summaryCards.map((card) => (
                <DashboardCard key={card.label} card={card} />
            ))}
        </div>
    );
}
