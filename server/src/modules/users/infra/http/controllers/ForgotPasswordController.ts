import { Request, Response } from 'express';

import { AppError } from '../../../../../shared/errors/AppError';
import { SendForgotPasswordEmailService } from '../../../services/SendForgotPasswordEmailService';
import { userForgotSchema } from '../../../validations/passwordSchema';

export class ForgotPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      await userForgotSchema.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error);
    }

    const { email } = request.body;

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService();

    await sendForgotPasswordEmail.execute(email);

    return response.status(204).json();
  }
}
