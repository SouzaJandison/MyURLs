import { getCustomRepository, Repository } from 'typeorm';

import jwt from 'jsonwebtoken';
import * as path from 'path';

import authConfig from '../../config/auth';
import { AppError } from '../../shared/errors/AppError';
import { User } from '../models/User';
import { BCryptHash } from '../providers/BCryptHash';
import { SendMail } from '../providers/SendMail';
import { UsersRepository } from '../repositories/UsersRepository';

interface IUserCreate {
  username: string;
  email: string;
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

interface ISessionResponse {
  user: User;
  token: string;
}

class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async index(email: string, password: string): Promise<ISessionResponse> {
    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const hashProvider = new BCryptHash();

    const isValidPassword = await hashProvider.compareHash(
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

  async create({ username, email, password }: IUserCreate): Promise<User> {
    const checkUserExists = await this.usersRepository.findOne({ email });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashProvider = new BCryptHash();

    const hashPassword = await hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      username,
      email,
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
