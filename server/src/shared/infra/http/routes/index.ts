import { Router } from 'express';

import { bookmarksRoutes } from '../../../../modules/Bookmarks/infra/http/routes/bookmarks.routes';
import { usersRoutes } from '../../../../modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/bookmarks', bookmarksRoutes);

export { routes };
