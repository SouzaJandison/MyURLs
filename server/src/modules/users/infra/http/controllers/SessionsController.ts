import { Request, Response } from 'express';

import { AppError } from '../../../../../shared/errors/AppError';
import { AuthenticateUserService } from '../../../services/AuthenticateUserService';
import { userRender } from '../../../templates/userRender';
import { schemaUserSession } from '../../../validations/userSchema';

export class SessionController {
  async index(request: Request, response: Response): Promise<Response> {
    try {
      await schemaUserSession.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error);
    }

    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const { user, token } = await authenticateUserService.execute(
      email,
      password,
    );

    return response.json({
      user: userRender.render(user),
      token,
    });
  }
}
