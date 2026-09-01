import Class from "./class.model.js";

export const getClassesService = async (classesLimit, classesToSkip) =>
    await Class.find().limit(classesLimit).skip(classesToSkip);

export const getClassByQuery = async (query) => await Class.findOne(query);

export const getClassByIdService = async (classId) =>
    await Class.findById(classId);

export const registerClassService = async (classData) =>
    await Class.create(classData);

export const updateClassService = async (classId, classData) => {
    const currentClass = await getClassByIdService(classId);

    currentClass.subjectTitle = classData.subjectTitle.toLowerCase();
    currentClass.level = classData.level;
    currentClass.levelYear = classData.levelYear;
    currentClass.schoolRoomId = classData.schoolRoomId;

    return await currentClass.save();
};

export const deleteClassService = async (classId) =>
    await Class.findByIdAndDelete(classId);

export const assignTeacherToClassService = async (classId, teacherId) => {
    const currentClass = await getClassByIdService(classId);

    currentClass.teacherId = teacherId;

    return await currentClass.save();
};
