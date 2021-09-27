import { BCryptHashProvider } from '../../../shared/containers/providers/HashProvider/implementations/BCryptHashProvider';
import { IHashProvider } from '../../../shared/containers/providers/HashProvider/models/IHashProvider';
import { TokenProvider } from '../../../shared/containers/providers/TokenProvider/implementations/TokenProvider';
import { ITokenProvider } from '../../../shared/containers/providers/TokenProvider/models/ITokenProvider';
import { AppError } from '../../../shared/errors/AppError';
import { User } from '../infra/typeorm/models/User';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IResponse {
  user: User;
  token: string;
}

export class AuthenticateUserService {
  private usersRepository: IUsersRepository;

  private bCryptHashProvider: IHashProvider;

  private tokenProvider: ITokenProvider;

  constructor() {
    this.usersRepository = new UsersRepository();
    this.bCryptHashProvider = new BCryptHashProvider();
    this.tokenProvider = new TokenProvider();
  }

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

    const token = this.tokenProvider.generateToken(user.id);

    return {
      user,
      token,
    };
  }
}
