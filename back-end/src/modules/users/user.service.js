import User from "./user.model.js";

export const getUserByEmail = async (email) => await User.findOne({ email });

export const getUserByIdService = async (id) => await User.findOne({ _id: id });

export const getUsersService = async (ids) =>
    await User.find({ _id: { $in: ids } });

export const userRegister = async (userData) => await User.create(userData);
