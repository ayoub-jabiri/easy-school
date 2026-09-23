import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../store/slices/auth.slice";
import PageLoading from "../global/PageLoading";
import PageError from "../global/PageError";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect, useState } from "react";
import NotFoundPage from "../../pages/not-found/NotFoundPage";

export default function AppLayout({ allowedRoles = [], activeHref, children }) {
    const { user, loading, error } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        if (user === null) {
            dispatch(getUserProfile());
        }
    }, []);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if ((loading || !user) && !error) {
        return <PageLoading />;
    }

    if (error) {
        return <PageError message={error.message} />;
    }

    const isAllowed = allowedRoles.includes(user?.role);

    if (!isAllowed) {
        return <NotFoundPage />;
    }

    return (
        <>
            <div className="flex max-w-screen">
                <Sidebar
                    role={user.role}
                    activeHref={activeHref}
                    isSidebarOpen={isSidebarOpen}
                    hideSidebar={() => setIsSidebarOpen(false)}
                />
                <div className="flex-1 max-w-full">
                    <Header
                        user={user}
                        openSidebar={() => setIsSidebarOpen(true)}
                    />
                    <main className="md:max-w-[calc(100vw-280px)]">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
