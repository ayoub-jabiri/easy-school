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
        if (!req.body) {
            return clientErrorResponse(res, 400, "Request body is missing");
        }

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
        if (!req.body) {
            return clientErrorResponse(res, 400, "Request body is missing");
        }

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

export const authenticationCheck = (req, res, next) => {
    const authHeader =
        req.headers?.authorization &&
        req.headers?.authorization.includes("Bearer") &&
        req.headers.authorization.split(" ")[1];

    if (!authHeader) {
        return clientErrorResponse(
            res,
            401,
            "Access denied due to not being authenticated: No token provided"
        );
    }

    next();
};

export const authorizationCheck = (allowedRules) => {
    return (req, res, next) => {
        const token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, async (error, user) => {
            if (error)
                return clientErrorResponse(
                    res,
                    403,
                    "Access denied due to not being authorized: Invalid token"
                );

            if (!allowedRules.includes(user.role))
                return clientErrorResponse(
                    res,
                    403,
                    "Access denied due to not being authorized: You do not have permission to access this resource"
                );

            req.user = user;
            next();
        });
    };
};
