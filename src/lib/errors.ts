export type ErrorName =
  // Errores de autenticacion
  | "EMAIL_EXISTS"
  | "USER_NOT_FOUND"
  | "INVALID_PASSWORD"
  | "PASSWORD_MISMATCH"
  | "SESSION_EXPIRED"
  // Errores de autorizacion
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "ACTION_NOT_ALLOWED"
  // Errores de validacion
  | "VALIDATION_ERROR"
  | "MISSING_FIELDS"
  // Errores internos
  | "DATABASE_ERROR"
  | "DUPLICATE_ENTRY"
  | "UNKNOWN_ERROR"
  | "RESOURCE_NOT_FOUND";

export class CustomError extends Error {
  name: ErrorName;

  constructor({ name, message }: { name: ErrorName; message: string }) {
    super(message);
    this.name = name;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
