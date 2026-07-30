export const clientErrorResponse = (res, statusCode, msg) => {
    res.status(statusCode).json({
        message: msg,
    });
};
