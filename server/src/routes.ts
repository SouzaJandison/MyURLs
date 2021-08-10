import { Router } from 'express';

import multer from 'multer';

import { BookmarksController } from './app/controllers/BookmarksController';
import { SessionController } from './app/controllers/SessionController';
import { UsersController } from './app/controllers/UsersController';
import { authMiddleware } from './app/middlewares/authMiddleware';
import { uploadsConfig } from './config/uploads';

const routes = Router();
const uploads = multer(uploadsConfig.multer);

const usersController = new UsersController();
const bookmarksController = new BookmarksController();
const sessionController = new SessionController();

routes.post('/users', uploads.single('avatarUser'), usersController.create);
routes.post('/users/session', sessionController.index);
routes.get('/users/verify/email/:id', usersController.verifyEmail);

routes.post('/bookmarks', authMiddleware, bookmarksController.create);
routes.get('/bookmarks', authMiddleware, bookmarksController.show);
routes.delete('/bookmarks/:id', authMiddleware, bookmarksController.delete);
routes.put('/bookmarks/:id', authMiddleware, bookmarksController.update);

export { routes };
