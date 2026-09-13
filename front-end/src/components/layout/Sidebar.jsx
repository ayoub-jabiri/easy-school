import {
    Home,
    Users,
    UserRound,
    BookOpen,
    DoorClosed,
    School,
    ClipboardCheck,
    Award,
    Megaphone,
    UserCircle,
    LogOut,
} from "lucide-react";

const menuItems = [
    {
        title: "MENU",
        items: [
            {
                icon: Home,
                label: "Dashboard",
                href: "/dashboard",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: Users,
                label: "Users",
                href: "users",
                visible: ["admin"],
            },
            {
                icon: UserRound,
                label: "Guardians",
                href: "guardians",
                visible: ["admin"],
            },
            {
                icon: BookOpen,
                label: "Subjects",
                href: "subjects",
                visible: ["admin"],
            },

            {
                icon: DoorClosed,
                label: "School Rooms",
                href: "school-rooms",
                visible: ["admin"],
            },
            {
                icon: School,
                label: "Classes",
                href: "classes",
                visible: ["admin", "teacher"],
            },
            {
                icon: ClipboardCheck,
                label: "Homework",
                href: "homework",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: Award,
                label: "Grades",
                href: "grades",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: Megaphone,
                label: "Announcements",
                href: "announcements",
                visible: ["admin", "teacher", "student", "parent"],
            },
        ],
    },
    {
        title: "OTHER",
        items: [
            {
                icon: UserCircle,
                label: "Profile",
                href: "/profile",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: LogOut,
                label: "Logout",
                href: "/logout",
                visible: ["admin", "teacher", "student", "parent"],
            },
        ],
    },
];

export default function Sidebar({ role, activeHref = "/dashboard" }) {
    return (
        <aside className="flex h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-slate-100 bg-white px-4 py-5">
            <a href="/" className="flex items-center gap-2 px-1">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-purple-400 via-pink-400 to-orange-300 text-sm">
                    🎓
                </span>
                <span className="text-base font-bold text-slate-900">
                    EasySchool
                </span>
            </a>

            <nav className="mt-6 flex flex-1 flex-col gap-1 text-sm">
                {menuItems.map((section) => (
                    <div key={section.title} className="mb-2">
                        <p className="mb-1 px-2 text-[11px] font-medium tracking-wide text-slate-400">
                            {section.title}
                        </p>

                        {section.items.map((item) => {
                            if (!item.visible.includes(role)) return null;

                            const Icon = item.icon;
                            const isActive = item.href === activeHref;

                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-lg px-2 py-2 transition-colors ${
                                        isActive
                                            ? "bg-purple-50 text-slate-900"
                                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                                    }`}
                                >
                                    <Icon className="h-4 w-4 shrink-0" />
                                    <span>{item.label}</span>
                                </a>
                            );
                        })}
                    </div>
                ))}
            </nav>
        </aside>
    );
}
