import { getSchoolRoomByIdService } from "../school-room/room.service.js";
import { getSubjectById } from "../subject/subject.service.js";
import { getUserByIdService, getUsersService } from "../users/user.service.js";
import Class from "./class.model.js";

export const getClassesService = async (classesLimit, classesToSkip) =>
    await Class.find().limit(classesLimit).skip(classesToSkip);

export const getClassByQuery = async (query) => await Class.findOne(query);

export const getClassByIdService = async (classId) =>
    await Class.findById(classId);

export const registerClassService = async (classData) => {
    const newClass = await Class.create(classData);

    const subject = await getSubjectById(classData.subjectId);

    subject.classes.push(newClass._id);
    await subject.save();

    const schoolRoom = await getSchoolRoomByIdService(classData.schoolRoomId);
    schoolRoom.classes.push(newClass._id);
    await schoolRoom.save();

    return newClass;
};

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

export const handleTeacherAssignmentService = async (
    action,
    classId,
    teacherId = null
) => {
    const currentClass = await getClassByIdService(classId);

    if (action === "assign") {
        currentClass.teacherId = teacherId;
    } else if (action === "unassign") {
        currentClass.teacherId = null;
    }

    return await currentClass.save();
};

export const handleStudentRegistrationService = async (
    action,
    classId,
    studentId
) => {
    const currentClass = await getClassByIdService(classId);

    if (action === "register") {
        currentClass.students.push(studentId);
    } else if (action === "unregister") {
        currentClass.students = currentClass.students.filter(
            (id) => id.toString() !== studentId.toString()
        );
    }

    return await currentClass.save();
};

export const getClassSchoolRoomService = async (classId) => {
    const currentClass = await getClassByIdService(classId);

    return await getSchoolRoomByIdService(currentClass.schoolRoomId);
};

export const getClassTeacherService = async (classId) => {
    const currentClass = await getClassByIdService(classId);

    return await getUserByIdService(currentClass.teacherId);
};

export const getClassStudentsService = async (classId) => {
    const currentClass = await getClassByIdService(classId);

    return await getUsersService(currentClass.students);
};
