import { Router } from 'express';

import { authMiddleware } from '../../../../users/infra/http/middlewares/authMiddleware';
import { BookmarksController } from '../controllers/BookmarksController';
import { ProviderController } from '../controllers/ProviderController';

const bookmarksRoutes = Router();

const bookmarkController = new BookmarksController();
const providerController = new ProviderController();

bookmarksRoutes.post('/', authMiddleware, bookmarkController.create);
bookmarksRoutes.get('/', authMiddleware, providerController.show);
bookmarksRoutes.delete('/:id', authMiddleware, providerController.delete);
bookmarksRoutes.put('/:id', authMiddleware, providerController.update);

export { bookmarksRoutes };
