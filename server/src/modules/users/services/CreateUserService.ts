import { resolve } from 'path';

import { IHashProvider } from '../../../shared/containers/providers/HashProvider/models/IHashProvider';
import { EtherealMailProvider } from '../../../shared/containers/providers/MailProvider/implementations/EtherealMailProvider.ts ';
import { IMailProvider } from '../../../shared/containers/providers/MailProvider/models/IMailProvider';
import { AppError } from '../../../shared/errors/AppError';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/models/User';
import { IUsersRepository } from '../repositories/IUsersRepository';

export class CreateUserService {
  private readonly mailProvider: IMailProvider;

  constructor(
    private usersRepository: IUsersRepository,

    private bCryptHashProvider: IHashProvider,
  ) {
    this.mailProvider = new EtherealMailProvider();
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

    const path = resolve(__dirname, '..', 'views', 'verifyMail.hbs');

    await this.mailProvider.sendMail({
      to: {
        name: username,
        email,
      },
      subject: '[MyURLs] Por favor verifique seu endereço de email.',
      templateData: {
        file: path,
        variables: {
          username,
          email,
          id: user.id,
          link: process.env.URL_MAIL,
        },
      },
    });

    return user;
  }
}
