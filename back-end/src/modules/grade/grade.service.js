import { getSubjectById } from "../subject/subject.service.js";
import { getUserByIdService } from "../users/user.service.js";
import Grade from "./grade.model.js";

export const getAllGradesService = async (
    userRole,
    gradesLimit,
    gradesToSkip
) => {
    if (userRole === "admin") {
        return await Grade.find().limit(gradesLimit).skip(gradesToSkip);
    } else if (userRole === "teacher") {
        return await Grade.find({ teacherId: req.user.id })
            .limit(gradesLimit)
            .skip(gradesToSkip);
    } else if (userRole === "students") {
        return await Grade.find({ studentId: req.user.id })
            .limit(gradesLimit)
            .skip(gradesToSkip);
    }
};

export const getGradeByIdService = async (gradeId) =>
    await Grade.findById(gradeId);

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

export const getGradeStudentService = async (gradeId) => {
    const grade = await getGradeByIdService(gradeId);

    return await getUserByIdService(grade.studentId);
};

export const getGradeTeacherService = async (gradeId) => {
    const grade = await getGradeByIdService(gradeId);

    return await getUserByIdService(grade.teacherId);
};
