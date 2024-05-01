// In summary, the asyncHandler function is a middleware wrapper designed to simplify error handling in Express.js applications. It allows asynchronous route handlers (requestHandler) to be written without explicit error handling, as any errors that occur during their execution will automatically be forwarded to the Express error handling middleware.

const AsyncHandler = (requestHandler) => {
    //req , res and next are handled by express to handle response , request and many more
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
        // Within the returned function, Promise.resolve() is used to wrap the invocation of the requestHandler function. This ensures that whatever requestHandler returns, whether it's a promise or not, will be treated as a promise.
    }
}


export { AsyncHandler }
