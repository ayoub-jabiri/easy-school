import { getClassByIdService } from "../class/class.service.js";
import ClassModel from "../class/class.model.js";
import { getUserByIdService } from "../users/user.service.js";
import Homework from "./homework.model.js";

export const getAllHomeworksService = async (
    user,
    homeworksLimit,
    homeworksToSkip
) => {
    if (user.role === "admin") {
        return await Homework.find()
            .sort({ createdAt: -1 })
            .limit(homeworksLimit)
            .skip(homeworksToSkip);
    } else if (user.role === "teacher") {
        return await Homework.find({ teacherId: user.id })
            .sort({ createdAt: -1 })
            .limit(homeworksLimit)
            .skip(homeworksToSkip);
    } else if (user.role === "student") {
        const classes = await ClassModel.find({ students: user.id });
        const classIds = classes.map((currentClass) => currentClass._id);

        return await Homework.find({ classId: { $in: classIds } })
            .sort({ createdAt: -1 })
            .limit(homeworksLimit)
            .skip(homeworksToSkip);
    }
};

export const getHomeworkByIdService = async (homeworkId) =>
    await Homework.findById(homeworkId);

export const registerHomeworkService = async (homeworkData) =>
    await Homework.create(homeworkData);

export const updateHomeworkService = async (homeworkId, homeworkData) => {
    const homework = await getHomeworkByIdService(homeworkId);

    homework.title = homeworkData.title;
    homework.description = homeworkData.description;
    homework.dueDate = new Date(homeworkData.dueDate);

    return await homework.save();
};

export const deleteHomeworkService = async (homeworkId) =>
    await Homework.findByIdAndDelete(homeworkId);

export const getHomeworkClassService = async (homeworkId) => {
    const homework = await getHomeworkByIdService(homeworkId);

    return await getClassByIdService(homework.classId);
};

export const getHomeworkTeacherService = async (homeworkId) => {
    const homework = await getHomeworkByIdService(homeworkId);

    return await getUserByIdService(homework.teacherId);
};
