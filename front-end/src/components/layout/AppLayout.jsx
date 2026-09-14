import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../store/slices/auth.slice";
import PageLoading from "../global/PageLoading";
import PageError from "../global/PageError";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect, useState } from "react";

export default function AppLayout({ children }) {
    const { user, loading, error } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        if (user === null) {
            dispatch(getUserProfile());
        }
    }, []);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (loading || !user) {
        return <PageLoading />;
    }

    if (error) {
        return <PageError message={error.message} />;
    }

    return (
        <>
            <div className="flex">
                <Sidebar
                    role={user.role}
                    isSidebarOpen={isSidebarOpen}
                    hideSidebar={() => setIsSidebarOpen(false)}
                />
                <div className="flex-1">
                    <Header
                        user={user}
                        openSidebar={() => setIsSidebarOpen(true)}
                    />
                    <main>{children}</main>
                </div>
            </div>
        </>
    );
}
