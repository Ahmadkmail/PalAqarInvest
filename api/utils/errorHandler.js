export const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode ? statusCode : 500;
    error.message = message ? message : 'Internal Server Error';
    return error;
}