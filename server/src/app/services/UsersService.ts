import { getCustomRepository, Repository } from 'typeorm';

import { hashSync } from 'bcryptjs';
import * as path from 'path';

import { AppError } from '../../shared/errors/AppError';
import { User } from '../models/User';
import { SendMail } from '../providers/SendMail';
import { UsersRepository } from '../repositories/UsersRepository';
import { schemaUserCreate } from '../validations/users/userCreate';

interface IUserCreate {
  username: string;
  email: string;
  avatarUser: string;
  password: string;
}

interface IUserSendEmail {
  username: string;
  email: string;
  id: string;
}

interface ISendEmailResponse {
  message: string;
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

  async sendVerificationEmail({
    username,
    email,
    id,
  }: IUserSendEmail): Promise<void> {
    const sendMail = new SendMail();

    const variables = {
      username,
      title: '[MyURLs] Por favor verifique seu endereço de email.',
      email,
      id,
      link: process.env.URL_MAIL,
    };

    const verifyPath = path.resolve(
      __dirname,
      '..',
      'views',
      'email',
      'verifyMail.hbs',
    );

    await sendMail.execute(variables, verifyPath);
  }

  async emailConfirmation(id: string): Promise<ISendEmailResponse> {
    const user = await this.usersRepository.findOne({ id });

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

export { UsersService };
