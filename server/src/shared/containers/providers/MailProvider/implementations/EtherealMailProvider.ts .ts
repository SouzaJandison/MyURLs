import nodemailer, { Transporter } from 'nodemailer';

import { HandlebarsMailTemplateProvider } from '../../MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import { IMailTemplateProvider } from '../../MailTemplateProvider/models/IMailTemplateProvider';
import { ISendMailDTO } from '../dtos/ISendMailTDO';
import { IMailProvider } from '../models/IMailProvider';

export class EtherealMailProvider implements IMailProvider {
  private readonly mailTemplateProvider: IMailTemplateProvider;

  private client: Transporter;

  constructor() {
    this.mailTemplateProvider = new HandlebarsMailTemplateProvider();

    this.client = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });
  }

  async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe MyURLs',
        address: from?.email || 'equipe@myurls.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
