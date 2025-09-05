import { ApiError } from "./ApiError";
import { ERROR_MESSAGES, STATUS_CODES } from "../constants";

export class UnauthorizedError extends ApiError {
  constructor(message: string = ERROR_MESSAGES.UNAUTHORIZED) {
    super(STATUS_CODES.UNAUTHORIZED, "Unauthorized", message);
  }
}
