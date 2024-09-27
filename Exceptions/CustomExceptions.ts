export class BaseException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ActionFailedException extends BaseException {
  constructor(message: string) {
    super(message);
  }
}

export class ElementNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ElementNotFoundException";
  }
}

export class SelectorNotFoundException extends BaseException {
  constructor(message: string) {
    super(message);
  }
}

export class TimeoutException extends BaseException {
  constructor(message: string) {
    super(message);
  }
}

export class ValidationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationException";
  }
}