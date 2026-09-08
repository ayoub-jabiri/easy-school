import { excludeUserPassword } from "../../utils/client.responses.js";
import { serverErrorResponse } from "../../utils/server.error.js";
import { getUserByIdService } from "../users/user.service.js";
import {
    getParentStudentsService,
    getStudentClassesService,
    getStudentGradesService,
    getStudentHomeworksService,
} from "./parent.service.js";

export const getParentStudents = async (req, res) => {
    try {
        const students = await getParentStudentsService(req.user.id);

        res.json({ students: students.map(excludeUserPassword) });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const getStudent = async (req, res) => {
    try {
        const student = await getUserByIdService(req.params.studentId);

        res.json({ student: excludeUserPassword(student) });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const getStudentClasses = async (req, res) => {
    try {
        const classes = await getStudentClassesService(req.params.studentId);

        res.json({ classes });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const getStudentGrades = async (req, res) => {
    try {
        const grades = await getStudentGradesService(req.params.studentId);

        res.json({ grades });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const getStudentHomeworks = async (req, res) => {
    try {
        const homeworks = await getStudentHomeworksService(
            req.params.studentId
        );

        res.json({ homeworks });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
