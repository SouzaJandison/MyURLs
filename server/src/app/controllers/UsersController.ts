import { Request, Response } from 'express';

import { UsersService } from '../services/UsersService';
import { render } from '../views/templates/userCreate';

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

    return response.status(201).json(render(user));
  }
}

export { UsersController };
