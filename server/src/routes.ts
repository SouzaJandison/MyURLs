import { Router } from 'express';

import { BookmarksController } from './app/controllers/BookmarksController';
import { FoldersController } from './app/controllers/FoldersController';
import { SessionController } from './app/controllers/SessionController';
import { UsersController } from './app/controllers/UsersController';
import { authMiddleware } from './app/middlewares/authMiddleware';

const routes = Router();

const usersController = new UsersController();
const bookmarksController = new BookmarksController();
const sessionController = new SessionController();
const foldersController = new FoldersController();

routes.post('/users', usersController.create);
routes.post('/users/session', sessionController.index);
routes.get('/users/verify/email/:id', usersController.verifyEmail);

routes.post('/bookmarks', authMiddleware, bookmarksController.create);
routes.get('/bookmarks', authMiddleware, bookmarksController.show);
routes.delete('/bookmarks/:id', authMiddleware, bookmarksController.delete);
routes.put('/bookmarks/:id', authMiddleware, bookmarksController.update);

routes.post('/folders', authMiddleware, foldersController.create);
routes.get('/folders', authMiddleware, foldersController.show);

export { routes };
