export default function DashboardCard({ card }) {
    return (
        <div
            className={`flex justify-between items-center rounded-2xl p-4 ${card.bg}`}
        >
            <div>
                <p className="text-sm text-slate-600">{card.label}</p>
                <p className="mt-1 text-2xl font-extrabold text-slate-900">
                    {card.value}
                </p>
            </div>
            {card.icon}
        </div>
    );
}
