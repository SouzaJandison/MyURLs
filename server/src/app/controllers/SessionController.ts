import { Request, Response } from 'express';

import { AppError } from '../../shared/errors/AppError';
import { UsersService } from '../services/UsersService';
import { schemaUserSession } from '../validations/userSchema';
import { userRender } from '../views/templates/userRender';

class SessionController {
  async index(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      await schemaUserSession.validate(
        {
          email,
          password,
        },
        { abortEarly: false },
      );
    } catch (error) {
      throw new AppError(error);
    }

    const userService = new UsersService();

    const { user, token } = await userService.index(email, password);
    return response.json({
      user: userRender.render(user),
      token,
    });
  }
}

export { SessionController };
