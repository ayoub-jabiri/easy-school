import { clientErrorResponse } from "../../../utils/client.error.js";
import { serverErrorResponse } from "../../../utils/server.error.js";
import { userSchema } from "../user.validation.js";

export const dataValidationChaeck = (req, res, next) => {
    try {
        if (!req.body) {
            return clientErrorResponse(res, 400, "Request body is missing");
        }

        const { fullName, phoneNumber, email, password } = req.body;

        userSchema.parse({
            fullName,
            phoneNumber,
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
