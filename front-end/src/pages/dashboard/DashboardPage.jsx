import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";

export default function DashboardPage() {
    const { user } = useSelector((state) => state.user);

    if (user?.role === "admin") {
        return <AdminDashboard />;
    }

    return (
        <div>
            <h1>DashboardPage</h1>
        </div>
    );
}
