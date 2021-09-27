import { Request, Response } from 'express';

import { EmailConfirmationUserService } from '../../../services/EmailConfirmationUserService';

export class VerifyEmailController {
  async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const emailConfirmation = new EmailConfirmationUserService();

    const { message } = await emailConfirmation.execute(id);

    return response.json({ message });
  }
}
