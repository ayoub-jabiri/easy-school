import z from "zod";

export const serverErrorResponse = (res, error) => {
    if (error instanceof z.ZodError) {
        return res.status(400).json({
            message: "Data validation failed",
            errors: JSON.parse(error),
        });
    }

    console.error("Server Error:", error);

    res.status(500).json({
        message: "An internal server error occurred",
        error: error.message,
    });
};
