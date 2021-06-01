import { getCustomRepository, Repository } from 'typeorm';

import { hashSync } from 'bcryptjs';

import { AppError } from '../../shared/errors/AppError';
import { User } from '../models/User';
import { UsersRepository } from '../repositories/UsersRepository';
import { schemaUserCreate } from '../validations/users/userCreate';

interface IUserCreate {
  username: string;
  email: string;
  avatarUser: string;
  password: string;
}

class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create({
    username,
    email,
    avatarUser,
    password,
  }: IUserCreate): Promise<User> {
    const avatarUserUrl = process.env.APP_FILES + avatarUser;

    try {
      await schemaUserCreate.validate(
        {
          username,
          email,
          avatarUserUrl,
          password,
        },
        { abortEarly: false },
      );
    } catch (error) {
      throw new AppError(error);
    }

    const checkUserExists = await this.usersRepository.findOne({ email });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashPassword = hashSync(password, 8);

    const user = this.usersRepository.create({
      username,
      email,
      avata_user_url: avatarUserUrl,
      password_hash: hashPassword,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export { UsersService };
