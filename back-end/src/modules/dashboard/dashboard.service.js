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
                .populate({
                    path: "classId",
                    select: "level levelYear subjectId",
                    populate: { path: "subjectId", select: "title" },
                }),

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

export const getTeacherDashboardService = async (teacherId) => {
    const [classes, students, subjects, pendingHomeworks] = await Promise.all([
        Class.countDocuments({ teacherId }),

        Class.distinct("students", { teacherId }),

        Class.distinct("subjectTitle", { teacherId }),

        Homework.countDocuments({
            teacherId,
            dueDate: { $gt: new Date() },
        }),
    ]);

    const teacherClasses = await Class.find({ teacherId }).populate(
        "schoolRoomId",
        "roomNumber"
    );

    const [recentAnnouncements, recentGrades] = await Promise.all([
        Announcement.find().sort({ createdAt: -1 }).limit(itemsLimit),

        Grade.find({ teacherId })
            .sort({ createdAt: -1 })
            .limit(itemsLimit)
            .populate("studentId", "fullName email")
            .populate("teacherId", "fullName email")
            .populate({
                path: "classId",
                select: "level levelYear subjectId",
                populate: { path: "subjectId", select: "title" },
            }),
    ]);

    return {
        stats: {
            classes,
            students: students?.length || 0,
            subjects: subjects.length,
            pendingHomeworks,
        },
        teacherClasses,
        recentAnnouncements,
        recentGrades,
    };
};

export const getStudentDashboardService = async (studentId) => {
    const [classes, subjects, teachers] = await Promise.all([
        Class.countDocuments({ students: studentId }),

        Class.distinct("subjectTitle", { students: studentId }),

        Class.distinct("teacherId", { students: studentId }),
    ]);

    const studentClassIds = await Class.distinct("_id", {
        students: studentId,
    });

    const pendingHomeworks = await Homework.countDocuments({
        classId: { $in: studentClassIds },
        dueDate: { $gt: new Date() },
    });

    const [recentAnnouncements, recentGrades] = await Promise.all([
        Announcement.find().sort({ createdAt: -1 }).limit(itemsLimit),

        Grade.find({ studentId })
            .sort({ createdAt: -1 })
            .limit(itemsLimit)
            .populate("studentId", "fullName email")
            .populate("teacherId", "fullName email")
            .populate({
                path: "classId",
                select: "level levelYear subjectId",
                populate: { path: "subjectId", select: "title" },
            }),
    ]);

    return {
        stats: {
            classes,
            subjects: subjects.length,
            teachers: teachers.length,
            pendingHomeworks,
        },
        recentAnnouncements,
        recentGrades,
    };
};
