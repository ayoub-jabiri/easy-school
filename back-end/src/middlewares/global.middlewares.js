// External Modules
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Internal Modules
import { clientErrorResponse } from "../utils/client.responses.js";

export const authenticationCheck = (req, res, next) => {
    const token =
        req.headers?.authorization &&
        req.headers?.authorization.includes("Bearer") &&
        req.headers.authorization.split(" ")[1];

    if (!token) {
        return clientErrorResponse(
            res,
            401,
            "Access denied due to not being authenticated: No token provided"
        );
    }

    jwt.verify(token, process.env.JWT_SECRET, async (error, user) => {
        if (error)
            return clientErrorResponse(
                res,
                401,
                "Access denied due to not being authorized: Invalid token"
            );

        req.user = user;

        next();
    });
};

export const authorizationCheck = (allowedRules) => {
    return (req, res, next) => {
        if (!allowedRules.includes(req.user.role))
            return clientErrorResponse(
                res,
                403,
                "Access denied due to not being authorized: You do not have permission to access this resource"
            );

        next();
    };
};

export const requestBodyCheck = (req, res, next) => {
    if (!req.body) {
        return clientErrorResponse(res, 400, "Missing request body");
    }

    next();
};

export const paramsIdCheck = (paramName) => {
    return (req, res, next) => {
        if (!req.params?.[paramName]) {
            return clientErrorResponse(res, 400, "Missing id parameter");
        }

        if (!mongoose.Types.ObjectId.isValid(req.params?.[paramName])) {
            return clientErrorResponse(res, 400, "Invalid id parameter");
        }
        next();
    };
};
