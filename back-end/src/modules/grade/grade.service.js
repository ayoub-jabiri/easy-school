import { getUserByIdService } from "../users/user.service.js";
import Grade from "./grade.model.js";

export const getAllGradesService = async (user, gradesLimit, gradesToSkip) => {
    if (user.role === "admin") {
        return await Grade.find().limit(gradesLimit).skip(gradesToSkip);
    } else if (user.role === "teacher") {
        return await Grade.find({ teacherId: user.id })
            .limit(gradesLimit)
            .skip(gradesToSkip);
    } else if (user.role === "student") {
        return await Grade.find({ studentId: user.id })
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
