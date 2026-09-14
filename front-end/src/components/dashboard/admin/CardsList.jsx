import { GraduationCap, School, UserGroup, UserRound } from "lucide-react";
import DashboardCard from "../DashboadCard";

const summaryCards = [
    {
        label: "Students",
        value: "1,218",
        bg: "bg-violet-100",
        icon: <GraduationCap />,
    },
    {
        label: "Teachers",
        value: "124",
        bg: "bg-yellow-100",
        icon: <UserRound />,
    },
    {
        label: "Parents",
        value: "960",
        bg: "bg-violet-100",
        icon: <UserGroup />,
    },
    {
        label: "Classes",
        value: "30",
        bg: "bg-yellow-100",
        icon: <School />,
    },
];

export default function CardsList() {
    return (
        <div className="col-span-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {summaryCards.map((card) => (
                <DashboardCard card={card} />
            ))}
        </div>
    );
}
