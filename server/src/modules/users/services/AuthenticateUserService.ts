import jwt from 'jsonwebtoken';

import { authConfig } from '../../../config/auth';
import { AppError } from '../../../shared/errors/AppError';
import { User } from '../infra/typeorm/models/User';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IResponse {
  user: User;
  token: string;
}

export class AuthenticateUserService {
  constructor(
    private usersRepository: IUsersRepository,

    private bCryptHashProvider: IHashProvider,
  ) {}

  async execute(email: string, password: string): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const isValidPassword = this.bCryptHashProvider.compareHash(
      password,
      user.password_hash,
    );

    if (!isValidPassword) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
