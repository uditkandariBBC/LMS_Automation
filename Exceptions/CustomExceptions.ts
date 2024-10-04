// Exceptions/CustomExceptions.ts

export class BaseException extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name; // Use new.target.name for better minification support
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ActionFailedException extends BaseException {
  constructor(message: string) {
    super(message);
  }
}

export class ElementNotFoundException extends BaseException {
  constructor(message: string) {
    super(message);
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

export class ValidationException extends BaseException {
  constructor(message: string) {
    super(message);
  }
}
