class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export { ApiResponse }

// In summary, the ApiResponse class is a simple representation of a response from an API call. It encapsulates the status code, data, message, and success status of the response, but it doesn't involve error handling or stack tracing. It's designed to be a lightweight and straightforward class for handling successful API responses.