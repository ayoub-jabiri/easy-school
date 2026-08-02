// External Modules
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Internal Modules
import { clientErrorResponse } from "../../../utils/client.responses.js";
import { serverErrorResponse } from "../../../utils/server.error.js";
import { getUserByEmail } from "../user.service.js";
import { userLoginSchema, userRegisterSchema } from "../user.validation.js";

export const registerDataValidationCheck = (req, res, next) => {
    try {
        const {
            fullName,
            phoneNumber,
            email,
            role,
            password,
            passwordConfirm,
        } = req.body;

        userRegisterSchema.parse({
            fullName,
            phoneNumber,
            email,
            role,
            password,
            passwordConfirm,
        });
    } catch (error) {
        return serverErrorResponse(res, error);
    }

    next();
};

export const loginDataValidationCheck = (req, res, next) => {
    try {
        const { email, password } = req.body;

        userLoginSchema.parse({
            email,
            password,
        });
    } catch (error) {
        return serverErrorResponse(res, error);
    }

    next();
};

export const userExistCheck = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await getUserByEmail(email);

        if (user) {
            return clientErrorResponse(
                res,
                400,
                "User already exists with this email"
            );
        }
    } catch (error) {
        return serverErrorResponse(res, error);
    }

    next();
};

export const userNotExistCheck = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await getUserByEmail(email);

        if (!user) {
            return clientErrorResponse(
                res,
                400,
                "There is no user registered with this email"
            );
        }
    } catch (error) {
        return serverErrorResponse(res, error);
    }

    next();
};

export const passwordMatchCheck = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return clientErrorResponse(res, 400, "Password is not correct");
        }
    } catch (error) {
        return serverErrorResponse(res, error);
    }

    next();
};
