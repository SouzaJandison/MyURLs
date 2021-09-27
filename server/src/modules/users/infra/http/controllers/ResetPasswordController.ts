import { Request, Response } from 'express';

import { AppError } from '../../../../../shared/errors/AppError';
import { ResetPasswordService } from '../../../services/ResetPasswordService';
import { userResetSchema } from '../../../validations/passwordSchema';

export class ResetPasswordController {
  async index(request: Request, response: Response): Promise<Response> {
    try {
      await userResetSchema.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error);
    }

    const { token } = request.params;
    const { password } = request.body;

    const resetPassword = new ResetPasswordService();

    await resetPassword.execute(token, password);

    return response.status(204).json();
  }
}
