import { resolve } from 'path';

import { EtherealMailProvider } from '../../../shared/containers/providers/MailProvider/implementations/EtherealMailProvider.ts ';
import { IMailProvider } from '../../../shared/containers/providers/MailProvider/models/IMailProvider';

interface IRequest {
  name: string;
  email: string;
  id: string;
}

export class SendMailRegisterUserService {
  private readonly mailProvider: IMailProvider;

  constructor() {
    this.mailProvider = new EtherealMailProvider();
  }

  async execute({ name, email, id }: IRequest): Promise<void> {
    const path = resolve(__dirname, '..', 'views', 'verifyMail.hbs');

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
          id,
          link: `${process.env.APP_WEB_URL}/users/verify/email`,
        },
      },
    });
  }
}
