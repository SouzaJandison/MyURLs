import { Request, Response } from 'express';

import { AppError } from '../../../../../shared/errors/AppError';
import { ListBookmarkService } from '../../../services/ListBookmarkService';
import { RemoveBookmarkService } from '../../../services/RemoveBookmarkService';
import { UpdateBookmarkService } from '../../../services/UpdateBookmarkService';
import { bookmarkRender } from '../../../templates/bookmarkRender';
import { schemaBookmarkUpdate } from '../../../validations/bookmarkSchema';
import { BookmarksRepository } from '../../typeorm/repositories/BookmarksRepository';

export class ProviderController {
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listAll = new ListBookmarkService(new BookmarksRepository());

    const bookmarks = await listAll.execute(id);

    return response.json(bookmarkRender.renderMany(bookmarks));
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

    const updateBookmark = new UpdateBookmarkService(new BookmarksRepository());

    await updateBookmark.execute({
      id,
      name,
      url,
    });

    return response.json({ message: 'Successful update bookmark' });
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const removeBookmark = new RemoveBookmarkService(new BookmarksRepository());

    await removeBookmark.execute(id);

    return response.json({ message: 'Successful remove bookmark' });
  }
}
