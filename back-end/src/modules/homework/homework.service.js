import { getClassByIdService } from "../class/class.service.js";
import ClassModel from "../class/class.model.js";
import { getUserByIdService } from "../users/user.service.js";
import Homework from "./homework.model.js";

const populateOptions = [
    {
        path: "classId",
        select: "level levelYear group subjectId",
        populate: { path: "subjectId", select: "title" },
    },
    { path: "teacherId", select: "fullName email" },
];

// export const getAllHomeworksService = async (
//     user,
//     homeworksLimit,
//     homeworksToSkip
// ) => {
//     if (user.role === "admin") {
//         return await Homework.find()
//             .sort({ createdAt: -1 })
//             .limit(homeworksLimit)
//             .skip(homeworksToSkip)
//             .populate(populateOptions);
//     } else if (user.role === "teacher") {
//         return await Homework.find({ teacherId: user.id })
//             .sort({ createdAt: -1 })
//             .limit(homeworksLimit)
//             .skip(homeworksToSkip)
//             .populate(populateOptions);
//     } else if (user.role === "student") {
//         const classes = await ClassModel.find({ students: user.id });
//         const classIds = classes.map((currentClass) => currentClass._id);

//         return await Homework.find({ classId: { $in: classIds } })
//             .sort({ createdAt: -1 })
//             .limit(homeworksLimit)
//             .skip(homeworksToSkip)
//             .populate(populateOptions);
//     }
// };

export const getAllHomeworksService = async ({
    user,
    page,
    limit,
    search,
    classId,
    status,
}) => {
    const skip = (page - 1) * limit;

    const filter = {};

    if (user.role === "teacher") {
        filter.teacherId = user.id;
    } else if (user.role === "student") {
        const classes = await ClassModel.find({ students: user.id }).select(
            "_id"
        );

        const classesIds = classes.map((currentClass) => currentClass._id);

        filter.classId = { $in: classesIds };
    }

    if (classId && classId.trim()) {
        filter.classId = classId;
    }

    if (search && search.trim()) {
        filter.title = new RegExp(search.trim(), "i");
    }

    const now = new Date();

    if (status === "active") {
        filter.dueDate = { $gt: now };
    } else if (status === "expired") {
        filter.dueDate = { $lte: now };
    }

    const [homeworks, totalHomeworks] = await Promise.all([
        Homework.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate(populateOptions),

        Homework.countDocuments(filter),
    ]);

    return { homeworks, totalHomeworks };
};

export const getHomeworkByIdService = async (homeworkId) =>
    await Homework.findById(homeworkId);

export const getSingleHomeworkService = async (homeworkId) =>
    await Homework.findById(homeworkId).populate(populateOptions);

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
