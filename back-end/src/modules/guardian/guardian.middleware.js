import { clientErrorResponse } from "../../utils/client.responses.js";
import { serverErrorResponse } from "../../utils/server.error.js";
import { getUserByIdService } from "../users/user.service.js";
import {
    getGuardianByIdService,
    getGuardianByQuery,
} from "./guardian.service.js";
import { guardianSchema } from "./guardian.validation.js";

export const guardianDataValidation = (req, res, next) => {
    try {
        const { studentId, parentId } = req.body;

        guardianSchema.parse({ studentId, parentId });

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const parentExistsCheck = async (req, res, next) => {
    try {
        const { parentId } = req.body;

        const parent = await getUserByIdService(parentId);

        if (!parent) {
            return clientErrorResponse(res, 404, "Parent not found");
        }

        if (parent?.role !== "parent") {
            return clientErrorResponse(res, 400, "The user is not a parent");
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const studentExistsCheck = async (req, res, next) => {
    try {
        const { studentId } = req.body;

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

export const guardianAlreadyExistsCheck = async (req, res, next) => {
    try {
        const { studentId, parentId } = req.body;

        const existingGuardian = await getGuardianByQuery({
            studentId,
            parentId,
        });

        if (existingGuardian) {
            return clientErrorResponse(
                res,
                409,
                "This parent is already registered as a guardian for this student"
            );
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const guardianExistsCheck = async (req, res, next) => {
    try {
        const { guardianId } = req.params;

        const guardian = await getGuardianByIdService(guardianId);

        if (!guardian) {
            return clientErrorResponse(res, 404, "Guardian not found");
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
