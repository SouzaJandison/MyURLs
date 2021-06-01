import { Router } from 'express';

import multer from 'multer';

import { UsersController } from './app/controllers/UsersController';
import { uploadsConfig } from './config/uploads';

const routes = Router();
const uploads = multer(uploadsConfig.multer);

const usersController = new UsersController();

routes.post('/users', uploads.single('avatarUser'), usersController.create);

export { routes };
