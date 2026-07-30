import User from "../user.model.js";

export const userRegister = async (userData) => {
    const newUser = (await User.create(userData)).toObject();

    delete newUser.password;

    return newUser;
};
