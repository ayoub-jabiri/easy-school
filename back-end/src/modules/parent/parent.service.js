import { getUsersService } from "../users/user.service.js";
import ClassModel from "../class/class.model.js";
import Grade from "../grade/grade.model.js";
import Homework from "../homework/homework.model.js";
import Guardian from "../guardian/guardian.model.js";

export const getParentStudentIdsService = async (parentId) => {
    const guardians = await Guardian.find({ parentId });

    return guardians.map((guardian) => guardian.studentId);
};

export const getParentStudentsService = async (parentId) => {
    const studentIds = await getParentStudentIdsService(parentId);

    return await getUsersService(studentIds);
};

export const isParentOfStudentService = async (parentId, studentId) => {
    const guardian = await Guardian.findOne({ parentId, studentId });

    return !!guardian;
};

export const getStudentClassesService = async (studentId) =>
    await ClassModel.find({ students: studentId });

export const getStudentGradesService = async (studentId) =>
    await Grade.find({ studentId });

export const getStudentHomeworksService = async (studentId) => {
    const classes = await getStudentClassesService(studentId);
    const classIds = classes.map((currentClass) => currentClass._id);

    return await Homework.find({ classId: { $in: classIds } });
};
