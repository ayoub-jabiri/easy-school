import Grade from "./grade.model.js";
import Class from "../class/class.model.js";

// export const getAllGradesService = async (user, gradesLimit, gradesToSkip) => {
//     if (user.role === "admin") {
//         return await Grade.find().limit(gradesLimit).skip(gradesToSkip);
//     } else if (user.role === "teacher") {
//         return await Grade.find({ teacherId: user.id })
//             .limit(gradesLimit)
//             .skip(gradesToSkip);
//     } else if (user.role === "student") {
//         return await Grade.find({ studentId: user.id })
//             .limit(gradesLimit)
//             .skip(gradesToSkip);
//     }
// };

export const getAllGradesService = async ({
    user,
    page,
    limit,
    search,
    classId,
    studentId,
    subjectId,
}) => {
    const skip = (page - 1) * limit;

    const filter = {};

    if (user.role === "teacher") {
        filter.teacherId = user.id;
    } else if (user.role === "student") {
        filter.studentId = user.id;
    }

    if (classId) {
        filter.classId = classId;
    }

    if (studentId && user.role !== "student") {
        filter.studentId = studentId;
    }

    if (subjectId && !classId) {
        const classesForSubject = await Class.find({ subjectId })
            .select("_id")
            .lean();

        filter.classId = {
            $in: classesForSubject.map((currentClass) => currentClass._id),
        };
    }

    if (search && search.trim()) {
        filter.evaluation = new RegExp(search.trim(), "i");
    }

    const [grades, totalGrades] = await Promise.all([
        Grade.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("studentId", "fullName email")
            .populate("teacherId", "fullName email")
            .populate({
                path: "classId",
                select: "level levelYear group subjectId",
                populate: { path: "subjectId", select: "title" },
            }),

        Grade.countDocuments(filter),
    ]);

    return { grades, totalGrades };
};

export const getGradeByIdService = async (gradeId) =>
    await Grade.findById(gradeId);

export const getGradeDetailsService = async (gradeId) =>
    await Grade.findById(gradeId)
        .populate("studentId", "fullName email")
        .populate("teacherId", "fullName email")
        .populate({
            path: "classId",
            select: "level levelYear group subjectId",
            populate: { path: "subjectId", select: "title" },
        });

export const registerGradeService = async (gradeData) =>
    await Grade.create(gradeData);

export const updateGradeService = async (gradeId, gradeData) => {
    const grade = await getGradeByIdService(gradeId);

    grade.grade = gradeData.grade;
    grade.evaluation = gradeData.evaluation;

    return await grade.save();
};

export const deleteGradeService = async (gradeId) =>
    await Grade.findByIdAndDelete(gradeId);
