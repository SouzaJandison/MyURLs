import { resolve } from 'path';

import { EtherealMailProvider } from '../../../shared/containers/providers/MailProvider/implementations/EtherealMailProvider.ts ';
import { IMailProvider } from '../../../shared/containers/providers/MailProvider/models/IMailProvider';
import { UserTokensRepository } from '../infra/typeorm/repositories/UserTokensRepository';
import { IUserTokensRepository } from '../repositories/IUserTokensRepository';

interface IRequest {
  name: string;
  email: string;
  id: string;
}

export class SendMailRegisterUserService {
  private userTokensRepository: IUserTokensRepository;

  private readonly mailProvider: IMailProvider;

  constructor() {
    this.userTokensRepository = new UserTokensRepository();
    this.mailProvider = new EtherealMailProvider();
  }

  async execute({ name, email, id }: IRequest): Promise<void> {
    const path = resolve(__dirname, '..', 'views', 'verifyMail.hbs');

    const { token } = await this.userTokensRepository.generate(id);

    await this.mailProvider.sendMail({
      to: {
        name,
        email,
      },
      subject: '[MyURLs] Por favor verifique seu endereço de email.',
      templateData: {
        file: path,
        variables: {
          name,
          email,
          token,
          link: `${process.env.APP_WEB_URL}/users/verify/email`,
        },
      },
    });
  }
}
