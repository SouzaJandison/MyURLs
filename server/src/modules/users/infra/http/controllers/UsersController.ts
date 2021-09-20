import { Request, Response } from 'express';

import { AppError } from '../../../../../shared/errors/AppError';
import { BCryptHashProvider } from '../../../providers/HashProvider/implementations/BCryptHashProvider';
import { CreateUserService } from '../../../services/CreateUserService';
import { userRender } from '../../../templates/userRender';
import { schemaUserCreate } from '../../../validations/userSchema';
import { UsersRepository } from '../../typeorm/repositories/UsersRepository';

export class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      await schemaUserCreate.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error);
    }

    const { username, email, password } = request.body;

    const createUser = new CreateUserService(
      new UsersRepository(),
      new BCryptHashProvider(),
    );

    const user = await createUser.execute({
      username,
      email,
      password,
    });

    return response.status(201).json(userRender.render(user));
  }
}
