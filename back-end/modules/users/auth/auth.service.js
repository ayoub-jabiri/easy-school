import User from "../user.model.js";

export const userRegister = async (userData) => await User.create(userData);
