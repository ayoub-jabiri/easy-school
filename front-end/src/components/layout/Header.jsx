import { Bell, MenuIcon } from "lucide-react";
import { Link, useLocation } from "react-router";

export default function Header({ user, openSidebar }) {
    const { pathname } = useLocation();

    return (
        <header className="sticky top-0 z-1 flex w-full items-center justify-between gap-4 bg-white px-6 py-4 border-b border-slate-100">
            <div className="max-md:flex max-md:items-center max-md:gap-5">
                <button
                    onClick={openSidebar}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm md:hidden cursor-pointer"
                >
                    <MenuIcon className="h-5 w-5" />
                </button>

                <div className="font-bold capitalize">
                    {pathname.split("/")[1]}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-500 hover:text-slate-700">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 text-[10px] font-semibold text-white">
                        1
                    </span>
                </button>

                <Link to="/profile" className="flex items-center gap-3">
                    <div className="text-right leading-tight">
                        <p className="text-sm font-semibold text-slate-800 capitalize">
                            {user.fullName}
                        </p>
                        <p className="text-xs text-slate-400 capitalize">
                            {user.role}
                        </p>
                    </div>

                    {user.avatarUrl ? (
                        <img
                            src={user.avatarUrl}
                            alt={user.fullName}
                            className="h-9 w-9 rounded-full object-cover"
                        />
                    ) : (
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-400 text-sm font-semibold text-white">
                            {user.fullName[0].toUpperCase()}
                        </span>
                    )}
                </Link>
            </div>
        </header>
    );
}
