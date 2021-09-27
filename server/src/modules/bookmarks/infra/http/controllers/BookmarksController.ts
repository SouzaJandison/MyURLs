import { Request, Response } from 'express';

import { AppError } from '../../../../../shared/errors/AppError';
import { CreateBookmarkService } from '../../../services/CreateBookmarkService';
import { bookmarkRender } from '../../../templates/bookmarkRender';
import { schemaBookmarkCreate } from '../../../validations/bookmarkSchema';
import { BookmarksRepository } from '../../typeorm/repositories/BookmarksRepository';

class BookmarksController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      await schemaBookmarkCreate.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error);
    }

    const { name, url } = request.body;
    const { id } = request.user;

    const createBookmark = new CreateBookmarkService(new BookmarksRepository());

    const bookmark = await createBookmark.execute({
      name,
      url,
      user_id: id,
    });

    return response.status(201).json(bookmarkRender.render(bookmark));
  }
}

export { BookmarksController };
