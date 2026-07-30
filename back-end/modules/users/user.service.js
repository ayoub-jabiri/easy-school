export const getUserByEmail = async (email) => await User.findOne({ email });
