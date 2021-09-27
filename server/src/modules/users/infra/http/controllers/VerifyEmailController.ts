import { Request, Response } from 'express';

import { EmailConfirmationUserService } from '../../../services/EmailConfirmationUserService';

export class VerifyEmailController {
  async index(request: Request, response: Response): Promise<Response> {
    console.log('passou');

    const { token } = request.params;

    const emailConfirmation = new EmailConfirmationUserService();

    const { message } = await emailConfirmation.execute(token);

    return response.json({ message });
  }
}
