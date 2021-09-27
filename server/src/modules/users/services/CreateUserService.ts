import { BCryptHashProvider } from '../../../shared/containers/providers/HashProvider/implementations/BCryptHashProvider';
import { IHashProvider } from '../../../shared/containers/providers/HashProvider/models/IHashProvider';
import { AppError } from '../../../shared/errors/AppError';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/models/User';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '../repositories/IUsersRepository';

export class CreateUserService {
  private usersRepository: IUsersRepository;

  private bCryptHashProvider: IHashProvider;

  constructor() {
    this.usersRepository = new UsersRepository();
    this.bCryptHashProvider = new BCryptHashProvider();
  }

  async execute({ username, email, password }: ICreateUserDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashPassword = await this.bCryptHashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      username,
      email,
      password: hashPassword,
    });

    return user;
  }
}
