import { Request, Response } from 'express';

import { BookmarksService } from '../services/BookmarksService';
import { render } from '../views/templates/bookmarks/bookmarkCreate';

class BookmarksController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, url, user_id, folder_id } = request.body;

    const bookmarkService = new BookmarksService();

    const bookmark = await bookmarkService.create({
      name,
      url,
      user_id,
      folder_id,
    });

    return response.status(201).json(render(bookmark));
  }
}

export { BookmarksController };
