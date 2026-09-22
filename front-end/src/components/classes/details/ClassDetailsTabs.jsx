import OverviewTab from "./tabs/OverviewTab";
import StudentsTab from "./tabs/StudentsTab";
import StaffTab from "./tabs/StaffTab";
import ManagementTab from "./tabs/ManagementTab";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../../store/slices/classes.slice";

export default function ClassDetailsTabs({ classId, classData }) {
    const { activeTab } = useSelector((state) => state.classes);
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);

    const isAdmin = user?.role === "admin";

    const tabs = [
        {
            key: "overview",
            label: "Overview",
        },
        {
            key: "students",
            label: "Students",
        },
        {
            key: "staff",
            label: "Subjects & Teacher",
        },
        {
            key: "management",
            label: "Management",
        },
    ];

    return (
        <div className="rounded-2xl bg-white shadow-sm">
            <div className="flex overflow-x-auto border-b border-slate-100">
                {tabs.map((tab) => {
                    if (!isAdmin && tab.key === "management") return null;

                    return (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => dispatch(setActiveTab(tab.key))}
                            className={`whitespace-nowrap px-5 py-4 text-sm font-semibold transition cursor-pointer ${
                                activeTab === tab.key
                                    ? "border-b-2 border-violet-500 text-violet-600"
                                    : "text-slate-400 hover:text-slate-600"
                            }`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            <div className="p-6">
                {activeTab === "overview" && (
                    <OverviewTab classId={classId} classData={classData} />
                )}

                {activeTab === "students" && (
                    <StudentsTab isAdmin={isAdmin} classId={classId} />
                )}

                {activeTab === "staff" && (
                    <StaffTab
                        isAdmin={isAdmin}
                        classId={classId}
                        classData={classData}
                    />
                )}

                {isAdmin && activeTab === "management" && (
                    <ManagementTab classId={classId} classData={classData} />
                )}
            </div>
        </div>
    );
}
