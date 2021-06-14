import { Request, Response } from 'express';

import { UsersService } from '../services/UsersService';
import { userRender } from '../views/templates/userRender';

class SessionController {
  async index(request: Request, response: Response): Promise<Response> {
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
