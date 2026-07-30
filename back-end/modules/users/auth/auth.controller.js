import { userRegister } from "./auth.service.js";
import { serverErrorResponse } from "../../../utils/server.error.js";

export const register = async (req, res) => {
    try {
        const { fullName, phoneNumber, email, password } = req.body;

        // const newUser = await userRegister({
        //     fullName,
        //     phoneNumber,
        //     email,
        //     password,
        // });
        res.json({
            message: "The user has been registered successfully",
            // user: newUser,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
