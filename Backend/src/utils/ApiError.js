// This JavaScript code defines a class named ApiError which extends the built-in Error class. This custom error class is designed to handle errors that may occur in an API context, providing additional properties such as statusCode, data, message, success, and errors.

class ApiError extends Error {
    // The constructor method is a special method that is automatically called when an instance of the class is created. It takes four parameters
    constructor(
      statusCode,
      message = "Something went wrong",
      errors = [],
      stack = ""
    ) {
      // The super() method is used to call the constructor of the parent class (Error) and pass the message parameter to it.
      super(message);
      this.statusCode = statusCode;
      this.data = null;
      this.message = message;
      this.success = false;
      this.errors = errors;
  
  
      // This block handles the stack trace of the error. If a stack parameter is provided, it assigns it to the stack property of the instance. Otherwise, it captures the stack trace using Error.captureStackTrace() and assigns it to the instance.
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  export { ApiError };