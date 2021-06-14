import { Request, Response } from 'express';

import { BookmarksService } from '../services/BookmarksService';
import { bookmarkRender } from '../views/templates/bookmarkRender';

class BookmarksController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, url, folder_id } = request.body;
    const { id } = request.user;

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
}

export { BookmarksController };
