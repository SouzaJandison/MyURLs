import { Request, Response } from 'express';

import { UsersService } from '../services/UsersService';
import { render } from '../views/templates/users/userCreate';

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { username, email, password } = request.body;
    const avatarUser = request.file.filename;

    const usersService = new UsersService();

    const user = await usersService.create({
      username,
      email,
      avatarUser,
      password,
    });

    await usersService.sendVerificationEmail({
      username,
      email,
      id: user.id,
    });

    return response.status(201).json(render(user));
  }

  async verifyEmail(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const usersService = new UsersService();
    const { message } = await usersService.emailConfirmation(id);

    return response.json({ message });
  }
}

export { UsersController };
