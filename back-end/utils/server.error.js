import z from "zod";

export const serverErrorResponse = (res, error) => {
    console.error("Server Error:", error);
    if (error instanceof z.ZodError) {
        return res.status(500).json({
            message: "Data validation failed",
            errors: JSON.parse(error),
        });
    }
    res.status(500).json({
        message: "An internal server error occurred",
        error: error.message,
    });
};
