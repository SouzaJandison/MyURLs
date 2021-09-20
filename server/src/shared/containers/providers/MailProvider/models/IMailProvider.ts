import { ISendMailDTO } from '../dtos/ISendMailTDO';

export interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
