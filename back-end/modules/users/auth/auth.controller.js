import { userRegister } from "./auth.service.js";
import { serverErrorResponse } from "../../../utils/server.error.js";
import { hashPassword, signToken } from "../../../utils/user.utils.js";
import { getUserByEmail } from "../user.service.js";
import { excludeUserPassword } from "../../../utils/client.responses.js";

export const register = async (req, res) => {
    try {
        const { fullName, phoneNumber, email, role, password } = req.body;

        const hashedPassword = await hashPassword(password);

        const newUser = await userRegister({
            fullName,
            phoneNumber,
            email,
            role,
            password: hashedPassword,
        });

        const accessToken = signToken(newUser);

        res.status(201).json({
            message: "The user has been registered successfully",
            accessToken,
            user: excludeUserPassword(newUser),
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const login = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await getUserByEmail(email);

        const accessToken = signToken(user);

        res.json({
            message: "The user has been logged in successfully",
            accessToken,
            user: excludeUserPassword(user),
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const profile = async (req, res) => {
    try {
        const user = await getUserByEmail(req.user.email);

        res.json({
            user: excludeUserPassword(user),
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
