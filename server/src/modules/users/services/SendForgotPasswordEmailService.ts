import { resolve } from 'path';

import { EtherealMailProvider } from '../../../shared/containers/providers/MailProvider/implementations/EtherealMailProvider.ts ';
import { IMailProvider } from '../../../shared/containers/providers/MailProvider/models/IMailProvider';
import { AppError } from '../../../shared/errors/AppError';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../infra/typeorm/repositories/UserTokensRepository';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUserTokensRepository } from '../repositories/IUserTokensRepository';

export class SendForgotPasswordEmailService {
  private usersRepository: IUsersRepository;

  private userTokensRepository: IUserTokensRepository;

  private mailProvider: IMailProvider;

  constructor() {
    this.usersRepository = new UsersRepository();
    this.userTokensRepository = new UserTokensRepository();
    this.mailProvider = new EtherealMailProvider();
  }

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    const pathTemplate = resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.username,
        email: user.email,
      },
      subject: '[MyURLs] Recuperação de senha',
      templateData: {
        file: pathTemplate,
        variables: {
          name: user.username,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}
