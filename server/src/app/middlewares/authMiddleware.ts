import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import { AppError } from '../../shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  id: string;
}

export function authMiddleware(
  request: Request,
  _: Response,
  next: NextFunction,
): void {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('JWT token is missing', 401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const decoded = jwt.verify(token, authConfig.jwt.secret);

    const { id } = decoded as ITokenPayload;

    request.user = {
      id,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}
