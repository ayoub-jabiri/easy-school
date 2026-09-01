import { clientErrorResponse } from "../../utils/client.responses.js";
import { serverErrorResponse } from "../../utils/server.error.js";
import { getSchoolRoomByIdService } from "../school-room/room.service.js";
import { getUserByIdService } from "../users/user.service.js";
import { getClassByIdService, getClassByQuery } from "./class.service.js";
import { assignTeacherSchema, classSchema } from "./class.validation.js";

export const classDataValidation = (req, res, next) => {
    try {
        const { subjectTitle, level, levelYear, schoolRoomId } = req.body;

        classSchema.parse({ subjectTitle, level, levelYear, schoolRoomId });

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const classAlreadyExistsCheck = async (req, res, next) => {
    try {
        const { subjectTitle, level, levelYear } = req.body;

        const schoolRoom = await getClassByQuery({
            subjectTitle: subjectTitle.toLowerCase(),
            level,
            levelYear,
        });

        if (schoolRoom) {
            return clientErrorResponse(res, 409, "Class already registered");
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const schoolRoomExistsCheck = async (req, res, next) => {
    try {
        const { schoolRoomId } = req.body;

        const schoolRoom = await getSchoolRoomByIdService(schoolRoomId);

        if (!schoolRoom) {
            return clientErrorResponse(res, 404, "School room not found");
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const classExistsCheck = async (req, res, next) => {
    try {
        const { classId } = req.params;

        const currentClass = await getClassByIdService(classId);

        if (!currentClass) {
            return clientErrorResponse(res, 404, "Class not found");
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const teacherAssignmentCheck = (checkType) => {
    return async (req, res, next) => {
        try {
            const { classId } = req.params;

            const currentClass = await getClassByIdService(classId);

            if (checkType === "hasTeacher" && currentClass?.teacherId) {
                return clientErrorResponse(
                    res,
                    400,
                    "Class already has a teacher assigned"
                );
            }

            if (
                checkType === "doesNotHaveTeacher" &&
                currentClass?.teacherId == null
            ) {
                return clientErrorResponse(
                    res,
                    400,
                    "Class does not have a teacher assigned"
                );
            }

            next();
        } catch (error) {
            serverErrorResponse(res, error);
        }
    };
};

export const assignTeacherDataValidation = async (req, res, next) => {
    try {
        const { teacherId } = req.body;

        assignTeacherSchema.parse({ teacherId });

        const teacher = await getUserByIdService(teacherId);

        if (!teacher) {
            return clientErrorResponse(res, 404, "Teacher not found");
        }

        if (teacher?.role !== "teacher") {
            return clientErrorResponse(res, 400, "The user is not a teacher");
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
