import { clientErrorResponse } from "../../utils/client.responses.js";
import { serverErrorResponse } from "../../utils/server.error.js";
import { getUserByIdService } from "../users/user.service.js";
import { isParentOfStudentService } from "./parent.service.js";

export const studentExistsCheck = async (req, res, next) => {
    try {
        const { studentId } = req.params;

        const student = await getUserByIdService(studentId);

        if (!student) {
            return clientErrorResponse(res, 404, "Student not found");
        }

        if (student?.role !== "student") {
            return clientErrorResponse(res, 400, "The user is not a student");
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const studentAccessCheck = async (req, res, next) => {
    try {
        const { studentId } = req.params;

        const isParentOfStudent = await isParentOfStudentService(
            req.user.id,
            studentId
        );

        if (!isParentOfStudent) {
            return clientErrorResponse(
                res,
                403,
                "You don't have permission to access this student's data"
            );
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
