import { School, Users, BookOpen, ClipboardCheck } from "lucide-react";
import DashboardCard from "../DashboadCard";

const summaryCards = [
    {
        label: "My Classes",
        value: "5",
        bg: "bg-violet-100",
        icon: <School />,
    },
    {
        label: "Students",
        value: "145",
        bg: "bg-yellow-100",
        icon: <Users />,
    },
    {
        label: "Subjects",
        value: "3",
        bg: "bg-violet-100",
        icon: <BookOpen />,
    },
    {
        label: "Pending Homework",
        value: "8",
        bg: "bg-yellow-100",
        icon: <ClipboardCheck />,
    },
];

export default function CardsList() {
    return (
        <div className="col-span-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {summaryCards.map((card) => (
                <DashboardCard key={card.label} card={card} />
            ))}
        </div>
    );
}
