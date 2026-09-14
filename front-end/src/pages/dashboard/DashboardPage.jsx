import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

export default function DashboardPage() {
    // const { user } = useSelector((state) => state.user);
    const user = { role: "teacher" };

    if (user?.role === "admin") {
        return <AdminDashboard />;
    }

    if (user?.role === "teacher") {
        return <TeacherDashboard />;
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
