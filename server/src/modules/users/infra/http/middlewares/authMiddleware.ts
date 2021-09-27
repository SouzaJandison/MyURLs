import { NextFunction, Request, Response } from 'express';

import { TokenProvider } from '../../../../../shared/containers/providers/TokenProvider/implementations/TokenProvider';
import { AppError } from '../../../../../shared/errors/AppError';

export function authMiddleware(
  request: Request,
  _: Response,
  next: NextFunction,
): void {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('JWT token is missing', 401);
  }

  const tokenProvider = new TokenProvider();

  try {
    const id = tokenProvider.verifyToken(authorization);

    request.user = {
      id,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}
