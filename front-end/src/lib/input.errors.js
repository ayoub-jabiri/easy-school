export const getInputError = (errors) => {
    const currentErrors = {};

    errors.forEach((error) => {
        currentErrors[error.path[0]] = error.message;
    });

    return currentErrors;
};
