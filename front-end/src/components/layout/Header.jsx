import { Search, MessageSquare, Bell } from "lucide-react";

export default function Header({
    userName = "John Doe",
    userRole = "Admin",
    avatarUrl,
}) {
    return (
        <header className="flex w-full items-center justify-between gap-4 bg-slate-50 px-6 py-4">
            <div className="relative w-full max-w-xs">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <Search className="h-4 w-4" />
                </span>
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full rounded-full bg-white py-2 pl-9 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-500 hover:text-slate-700">
                    <MessageSquare className="h-4 w-4" />
                </button>

                <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-500 hover:text-slate-700">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 text-[10px] font-semibold text-white">
                        1
                    </span>
                </button>

                <div className="flex items-center gap-3">
                    <div className="text-right leading-tight">
                        <p className="text-sm font-semibold text-slate-800">
                            {userName}
                        </p>
                        <p className="text-xs text-slate-400">{userRole}</p>
                    </div>

                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={userName}
                            className="h-9 w-9 rounded-full object-cover"
                        />
                    ) : (
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-400 text-sm font-semibold text-white">
                            {userName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </span>
                    )}
                </div>
            </div>
        </header>
    );
}
