import { Request, Response } from 'express';

import { AppError } from '../../shared/errors/AppError';
import { UsersService } from '../services/UsersService';
import { userRender } from '../templates/userRender';
import { schemaUserSession } from '../validations/userSchema';

class SessionController {
  async index(request: Request, response: Response): Promise<Response> {
    try {
      await schemaUserSession.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error);
    }

    const { email, password } = request.body;

    const userService = new UsersService();

    const { user, token } = await userService.index(email, password);

    return response.json({
      user: userRender.render(user),
      token,
    });
  }
}

export { SessionController };
