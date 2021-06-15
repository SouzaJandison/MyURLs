import { Request, Response } from 'express';

import { AppError } from '../../shared/errors/AppError';
import { BookmarksService } from '../services/BookmarksService';
import {
  schemaBookmarkCreate,
  schemaBookmarkUpdate,
} from '../validations/bookmarkSchema';
import { bookmarkRender } from '../views/templates/bookmarkRender';

class BookmarksController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, url, folder_id } = request.body;
    const { id } = request.user;

    try {
      await schemaBookmarkCreate.validate(
        {
          name,
          url,
          user_id: id,
          folder_id,
        },
        { abortEarly: false },
      );
    } catch (error) {
      throw new AppError(error);
    }

    const bookmarkService = new BookmarksService();

    const bookmark = await bookmarkService.create({
      name,
      url,
      user_id: id,
      folder_id,
    });

    return response.status(201).json(bookmarkRender.render(bookmark));
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const bookmarkService = new BookmarksService();

    const bookmarks = await bookmarkService.show(id);

    return response.json(bookmarkRender.renderMany(bookmarks));
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const bookmarkService = new BookmarksService();

    await bookmarkService.delete(id);

    return response.json({ message: 'Successful remove bookmark' });
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, url } = request.body;
    const { id } = request.params;

    try {
      await schemaBookmarkUpdate.validate(
        {
          id,
          name,
          url,
        },
        { abortEarly: false },
      );
    } catch (error) {
      throw new AppError(error);
    }

    const bookmarkService = new BookmarksService();

    await bookmarkService.update({
      id,
      name,
      url,
    });

    return response.json({ message: 'Successful update bookmark' });
  }
}

export { BookmarksController };
