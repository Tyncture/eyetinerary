export enum ApiErrorType {
  COMMUNICATION_FAILED =
  "An error has occured while trying to reach the server.",
  BAD_REQUEST = "The request was rejected by the server.",
  UNAUTHORIZED = "Authentication failed. Try and login again.",
  UNKNOWN = "An unknown error has occured."
}

export class ApiError extends Error {
  constructor(error: ApiErrorType | number) {
    if (typeof error === "number") {
      switch (error) {
        case -1:
          super(ApiErrorType.COMMUNICATION_FAILED);
          break;
        case 400:
          super(ApiErrorType.BAD_REQUEST);
          break;
        case 401:
          super(ApiErrorType.UNAUTHORIZED);
          break;
        default:
          super(ApiErrorType.UNKNOWN);
      }
    } else {
      super(error);
    }
    this.name = "ApiError";
  }
}
