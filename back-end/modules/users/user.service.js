import User from "./user.model.js";

export const getUserByEmail = async (email) => await User.findOne({ email });
