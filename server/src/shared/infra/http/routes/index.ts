import { Router } from 'express';

import { bookmarksRoutes } from '../../../../modules/bookmarks/infra/http/routes/bookmarks.routes';
import { passwordRoutes } from '../../../../modules/users/infra/http/routes/password.routes';
import { usersRoutes } from '../../../../modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/password', passwordRoutes);
routes.use('/bookmarks', bookmarksRoutes);

export { routes };
