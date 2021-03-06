import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { AppError } from '../../errors/AppError';
import createConnection from '../typeorm';
import { routes } from './routes';

createConnection().then(() =>
  console.log('💥 successfully connected with database'),
);

const app = express();

app.use(express.json());
app.use(routes);

app.use(
  (
    err: Error,
    request: Request,
    response: Response,
    _: NextFunction,
  ): Response => {
    if (err instanceof AppError) {
      return response.status(err.statuscode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'Error',
      message: `Internal server error ${err.message}`,
    });
  },
);

export { app };
