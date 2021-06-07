import { Router } from 'express';

import multer from 'multer';

import { BookmarksController } from './app/controllers/BookmarksController';
import { UsersController } from './app/controllers/UsersController';
import { uploadsConfig } from './config/uploads';

const routes = Router();
const uploads = multer(uploadsConfig.multer);

const usersController = new UsersController();
const bookmarksController = new BookmarksController();

routes.post('/users', uploads.single('avatarUser'), usersController.create);

routes.post('/bookmarks', bookmarksController.create);

export { routes };
