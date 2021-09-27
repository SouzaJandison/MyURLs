import jwt from 'jsonwebtoken';

import { ITokenPayloadTDO } from '../dtos/ITokenPayloadDTO';
import { ITokenProvider } from '../models/ITokenProvider';

export class TokenProvider implements ITokenProvider {
  verifyToken(value: string): string {
    const token = value.replace('Bearer', '').trim();

    const decoded = jwt.verify(token, process.env.APP_SECRET);

    const { id } = decoded as ITokenPayloadTDO;

    return id;
  }

  generateToken(value: string): string {
    const token = jwt.sign({ id: value }, process.env.APP_SECRET);

    return token;
  }
}
