export class AppError {
  public readonly message: string;

  public readonly statuscode: number;

  constructor(message: any, statuscode = 400) {
    this.message = message;
    this.statuscode = statuscode;
  }
}
