import { GraduationCap, School, UserGroup, UserRound } from "lucide-react";
import DashboardCard from "../DashboadCard";

export default function CardsList({ data }) {
    const summaryCards = [
        {
            label: "Students",
            value: data?.students || "N/A",
            bg: "bg-violet-100",
            icon: <GraduationCap />,
        },
        {
            label: "Teachers",
            value: data?.teachers || "N/A",
            bg: "bg-yellow-100",
            icon: <UserRound />,
        },
        {
            label: "Parents",
            value: data?.parents || "N/A",
            bg: "bg-violet-100",
            icon: <UserGroup />,
        },
        {
            label: "Classes",
            value: data?.classes || "N/A",
            bg: "bg-yellow-100",
            icon: <School />,
        },
    ];

    return (
        <div className="col-span-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {summaryCards.map((card) => (
                <DashboardCard card={card} key={card.label} />
            ))}
        </div>
    );
}
