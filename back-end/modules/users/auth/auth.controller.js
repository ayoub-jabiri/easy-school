// External Modules
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Internal Modules
import { userRegister } from "./auth.service.js";
import { serverErrorResponse } from "../../../utils/server.error.js";

export const register = async (req, res) => {
    try {
        const { fullName, phoneNumber, email, role, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userRegister({
            fullName,
            phoneNumber,
            email,
            role,
            password: hashedPassword,
        });

        const accessToken = jwt.sign(
            { userId: newUser._id, email: newUser.email, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "15d" }
        );

        res.json({
            message: "The user has been registered successfully",
            accessToken,
            user: newUser,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
