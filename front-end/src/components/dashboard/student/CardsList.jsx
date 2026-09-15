import { School, BookOpen, UserRound, ClipboardCheck } from "lucide-react";
import DashboardCard from "../DashboadCard";

export default function CardsList({ stats }) {
    const summaryCards = [
        {
            label: "My Classes",
            value: stats?.classes ?? 0,
            bg: "bg-violet-100",
            icon: <School />,
        },
        {
            label: "Subjects",
            value: stats?.subjects ?? 0,
            bg: "bg-yellow-100",
            icon: <BookOpen />,
        },
        {
            label: "Teachers",
            value: stats?.teachers ?? 0,
            bg: "bg-violet-100",
            icon: <UserRound />,
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
