import jwt from "jsonwebtoken";

export const signToken = (user) => {
    const token = jwt.sign(
        {
            userId: user._id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15d",
        }
    );
    return token;
};
