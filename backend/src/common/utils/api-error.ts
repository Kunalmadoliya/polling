export class ApiError extends Error {
  public statusCode: number;
  public success: boolean;
  public errors: unknown[];
  public isOperational: boolean;

  constructor(
    statusCode: number,
    message: string,
    errors: unknown[] = [],
    stack?: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;
    this.isOperational = true;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static badRequest(msg = "Invalid request data") {
    return new ApiError(400, msg);
  }

  static unauthorized(msg = "Authentication required. Please login") {
    return new ApiError(401, msg);
  }

  static forbidden(msg = "You do not have permission to perform this action") {
    return new ApiError(403, msg);
  }

  static notFound(msg = "Requested resource not found") {
    return new ApiError(404, msg);
  }

  static conflict(msg = "Resource already exists") {
    return new ApiError(409, msg);
  }

  static internal(msg = "Something went wrong on the server") {
    return new ApiError(500, msg);
  }
}