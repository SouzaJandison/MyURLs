import { Request, Response } from 'express';

import { AppError } from '../../shared/errors/AppError';
import { UsersService } from '../services/UsersService';
import { userRender } from '../templates/userRender';
import { schemaUserCreate } from '../validations/userSchema';

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { username, email, password } = request.body;

    try {
      await schemaUserCreate.validate(
        {
          username,
          email,
          password,
        },
        { abortEarly: false },
      );
    } catch (error) {
      throw new AppError(error);
    }

    const usersService = new UsersService();

    const { user, token } = await usersService.create({
      username,
      email,
      password,
    });

    return response.status(201).json({
      user: userRender.render(user),
      token,
    });
  }

  async verifyEmail(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const usersService = new UsersService();
    const { message } = await usersService.emailConfirmation(id);

    return response.json({ message });
  }
}

export { UsersController };
