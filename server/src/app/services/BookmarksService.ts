import { getCustomRepository, Repository } from 'typeorm';

import { AppError } from '../../shared/errors/AppError';
import { Bookmark } from '../models/Bookmark';
import { BookmarksRepository } from '../repositories/BookmarksRepository';
import { schemaBookmarkCreate } from '../validations/bookmarks/bookmarkCreate';

interface IBookmarkCreate {
  name: string;
  url: string;
  user_id: string;
  folder_id?: string;
}

class BookmarksService {
  private bookmarksRepository: Repository<Bookmark>;

  constructor() {
    this.bookmarksRepository = getCustomRepository(BookmarksRepository);
  }

  async create({
    name,
    url,
    user_id,
    folder_id,
  }: IBookmarkCreate): Promise<Bookmark> {
    try {
      await schemaBookmarkCreate.validate(
        {
          name,
          url,
          user_id,
          folder_id,
        },
        { abortEarly: false },
      );
    } catch (error) {
      throw new AppError(error);
    }

    const bookmark = this.bookmarksRepository.create({
      name,
      url,
      user_id,
    });

    await this.bookmarksRepository.save(bookmark);

    return bookmark;
  }
}

export { BookmarksService };
