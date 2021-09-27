import { AppError } from '../../../shared/errors/AppError';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IResponse {
  message: string;
}

export class EmailConfirmationUserService {
  private usersRepository: IUsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async execute(id: string): Promise<IResponse> {
    const user = await this.usersRepository.findById(id);

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
