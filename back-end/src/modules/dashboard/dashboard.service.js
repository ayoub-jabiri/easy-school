import User from "../users/user.model.js";
import Class from "../class/class.model.js";
import Subject from "../subject/subject.model.js";
import SchoolRoom from "../school-room/room.model.js";
import Guardian from "../guardian/guardian.model.js";
import Announcement from "../announcement/announcement.model.js";
import Grade from "../grade/grade.model.js";
import Homework from "../homework/homework.model.js";

const itemsLimit = 5;

export const getAdminDashboardService = async () => {
    const [
        students,
        boys,
        girls,
        teachers,
        parents,
        classes,
        subjects,
        schoolRooms,
        guardians,
        announcements,
        grades,
        homeworks,
    ] = await Promise.all([
        User.countDocuments({ role: "student" }),
        User.countDocuments({ gender: "male", role: "student" }),
        User.countDocuments({ gender: "female", role: "student" }),
        User.countDocuments({ role: "teacher" }),
        User.countDocuments({ role: "parent" }),
        Class.countDocuments(),
        Subject.countDocuments(),
        SchoolRoom.countDocuments(),
        Guardian.countDocuments(),
        Announcement.countDocuments(),
        Grade.countDocuments(),
        Homework.countDocuments(),
    ]);

    const [recentAnnouncements, recentGrades, latestRegisteredStudents] =
        await Promise.all([
            Announcement.find().sort({ createdAt: -1 }).limit(itemsLimit),

            Grade.find()
                .sort({ createdAt: -1 })
                .limit(itemsLimit)
                .populate("studentId", "fullName email")
                .populate("teacherId", "fullName email")
                .populate("classId", "subjectTitle level levelYear"),

            User.find({ role: "student" })
                .sort({ createdAt: -1 })
                .limit(itemsLimit)
                .select("-password"),
        ]);

    return {
        overview: {
            students,
            boys,
            girls,
            teachers,
            parents,
            classes,
            subjects,
            schoolRooms,
            guardians,
            announcements,
            grades,
            homeworks,
        },
        recentAnnouncements,
        recentGrades,
        latestRegisteredStudents,
    };
};
