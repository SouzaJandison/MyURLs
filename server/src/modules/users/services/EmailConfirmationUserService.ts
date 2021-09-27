import { AppError } from '../../../shared/errors/AppError';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../infra/typeorm/repositories/UserTokensRepository';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUserTokensRepository } from '../repositories/IUserTokensRepository';

interface IResponse {
  message: string;
}

export class EmailConfirmationUserService {
  private userTokenRepository: IUserTokensRepository;

  private usersRepository: IUsersRepository;

  constructor() {
    this.userTokenRepository = new UserTokensRepository();
    this.usersRepository = new UsersRepository();
  }

  async execute(token: string): Promise<IResponse> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    if (user.email_verification) {
      return {
        message: `${user.email} is already verified.`,
      };
    }

    await this.usersRepository.save({
      ...user,
      email_verification: true,
    });

    return {
      message: 'successful email verification',
    };
  }
}
