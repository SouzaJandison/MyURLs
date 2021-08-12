import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

import { AppError } from '../../shared/errors/AppError';

interface IVariables {
  username: string;
  title: string;
  email: string;
}

class SendMail {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });
  }

  async execute(variables: IVariables, path: string): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');
    const mailTemplateParse = handlebars.compile(templateFileContent);
    const html = mailTemplateParse(variables);

    try {
      await this.transporter.sendMail({
        from: process.env.MAILER_MAIL,
        to: variables.email,
        subject: variables.title,
        html,
      });
    } catch (error) {
      throw new AppError('Failed to send email!');
    }
  }
}

export { SendMail };
