import User from "./user.model.js";

export const getUserByEmail = async (email) => await User.findOne({ email });

export const userRegister = async (userData) => await User.create(userData);
