import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";
import ParentDashboard from "./ParentDashboard";

export default function DashboardPage() {
    const { user } = useSelector((state) => state.user);

    if (user?.role === "admin") {
        return <AdminDashboard />;
    }

    if (user?.role === "teacher") {
        return <TeacherDashboard />;
    }

    if (user?.role === "student") {
        return <StudentDashboard />;
    }

    if (user?.role === "parent") {
        return <ParentDashboard />;
    }
}
