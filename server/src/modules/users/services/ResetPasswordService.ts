import { addHours, isAfter } from 'date-fns';

import { BCryptHashProvider } from '../../../shared/containers/providers/HashProvider/implementations/BCryptHashProvider';
import { IHashProvider } from '../../../shared/containers/providers/HashProvider/models/IHashProvider';
import { AppError } from '../../../shared/errors/AppError';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../infra/typeorm/repositories/UserTokensRepository';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUserTokensRepository } from '../repositories/IUserTokensRepository';

export class ResetPasswordService {
  private userTokenRepository: IUserTokensRepository;

  private userRepository: IUsersRepository;

  private bCryptHashProvider: IHashProvider;

  constructor() {
    this.userTokenRepository = new UserTokensRepository();
    this.userRepository = new UsersRepository();
    this.bCryptHashProvider = new BCryptHashProvider();
  }

  async execute(token: string, password: string): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const compareDate = addHours(userToken.created_at, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password_hash = await this.bCryptHashProvider.generateHash(password);

    await this.userRepository.save(user);
  }
}
