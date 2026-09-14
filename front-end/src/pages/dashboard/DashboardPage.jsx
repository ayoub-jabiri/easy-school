import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";

export default function DashboardPage() {
    // const { user } = useSelector((state) => state.user);
    const user = { role: "student" };

    if (user?.role === "admin") {
        return <AdminDashboard />;
    }

    if (user?.role === "student") {
        return <StudentDashboard />;
    }

    return (
        <div>
            <h1>DashboardPage</h1>
        </div>
    );
}
