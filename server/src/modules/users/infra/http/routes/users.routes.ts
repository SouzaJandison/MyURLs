import { Router } from 'express';

import { SessionController } from '../controllers/SessionsController';
import { UsersController } from '../controllers/UsersController';
import { VerifyEmailController } from '../controllers/VerifyEmailController';

const usersRoutes = Router();

const usersController = new UsersController();
const sessionsController = new SessionController();
const verifyEmailController = new VerifyEmailController();

usersRoutes.post('/', usersController.create);
usersRoutes.post('/session', sessionsController.index);
usersRoutes.get('/verify/email/:id', verifyEmailController.index);

export { usersRoutes };
