export class ApiError extends Error {
  public statusCode: number;
  public error: string;

  constructor(statusCode: number, error: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    Error.captureStackTrace(this, this.constructor);
  }
}
