import { Request, Response } from 'express';

import { AppError } from '../../../../../shared/errors/AppError';
import { CreateUserService } from '../../../services/CreateUserService';
import { SendMailRegisterUserService } from '../../../services/SendMailRegisterUserService';
import { userRender } from '../../../templates/userRender';
import { schemaUserCreate } from '../../../validations/userSchema';

export class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      await schemaUserCreate.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error);
    }

    const { username, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      username,
      email,
      password,
    });

    const sendMail = new SendMailRegisterUserService();

    await sendMail.execute({
      name: username,
      email,
      id: user.id,
    });

    return response.status(201).json(userRender.render(user));
  }
}
