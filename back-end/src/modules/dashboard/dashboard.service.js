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
        availableSchoolRooms,
        occupiedSchoolRooms,
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
        SchoolRoom.countDocuments({ classes: { $size: 0 } }),
        SchoolRoom.countDocuments({ "classes.0": { $exists: true } }),
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
            availableSchoolRooms,
            occupiedSchoolRooms,
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

        Class.distinct("subjectId", { teacherId }),

        Homework.countDocuments({
            teacherId,
            dueDate: { $gt: new Date() },
        }),
    ]);

    const teacherClasses = await Class.find({ teacherId })
        .limit(itemsLimit)
        .populate("students", "fullName email")
        .populate("schoolRoomId", "roomNumber")
        .populate("subjectId", "title");

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

        Class.distinct("subjectId", { students: studentId }),

        Class.distinct("teacherId", { students: studentId }),
    ]);

    const studentClassIds = await Class.distinct("_id", {
        students: studentId,
    });

    const pendingHomeworks = await Homework.countDocuments({
        classId: { $in: studentClassIds },
        dueDate: { $gt: new Date() },
    });

    const studentsClasses = await Class.find({ students: studentId })
        .limit(itemsLimit)
        .populate("students", "fullName email")
        .populate("schoolRoomId", "roomNumber")
        .populate("subjectId", "title");

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
        studentsClasses,
        recentAnnouncements,
        recentGrades,
    };
};

export const getParentDashboardService = async (parentId) => {
    const guardians = await Guardian.find({ parentId });
    const studentIds = guardians.map((guardian) => guardian.studentId);

    const [students, classes, grades] = await Promise.all([
        studentIds.length,

        Class.countDocuments({ students: { $in: studentIds } }),

        Grade.countDocuments({ studentId: { $in: studentIds } }),
    ]);

    const children = await User.find({ _id: { $in: studentIds } })
        .sort({ createdAt: -1 })
        .limit()
        .select("-password -role");

    const childrenClassIds = await Class.distinct("_id", {
        students: { $in: studentIds },
    });

    const pendingHomeworks = await Homework.countDocuments({
        classId: { $in: childrenClassIds },
        dueDate: { $gt: new Date() },
    });

    const [recentAnnouncements, recentGrades] = await Promise.all([
        Announcement.find().sort({ createdAt: -1 }).limit(itemsLimit),

        Grade.find({ studentId: { $in: studentIds } })
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
            students,
            classes,
            grades,
            pendingHomeworks,
        },
        children,
        recentAnnouncements,
        recentGrades,
    };
};
