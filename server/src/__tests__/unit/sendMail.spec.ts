import dotenv from 'dotenv';
import * as path from 'path';

import { SendMail } from '../../app/providers/SendMail';

dotenv.config();

let sendMail: SendMail;

describe('Send Mail Provider', () => {
  beforeAll(async () => {
    sendMail = new SendMail();
  });

  test('Should return message info if email sent successfully ', async () => {
    const variables = {
      username: 'any username',
      title: '[MyURLs] Por favor verifique seu endereço de email.',
      email: 'any_email@mail.com.br',
      id: 'any_id',
      link: process.env.URL_MAIL,
    };

    const verifyPath = path.resolve(
      __dirname,
      '..',
      '..',
      'app',
      'views',
      'email',
      'verifyMail.hbs',
    );

    const result = await sendMail.execute(variables, verifyPath);

    expect(result.accepted.join()).toBe('any_email@mail.com.br');
    expect(result).toHaveProperty('messageId');
  });
});
