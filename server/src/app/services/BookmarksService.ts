import { getCustomRepository, Repository } from 'typeorm';

import { AppError } from '../../shared/errors/AppError';
import { Bookmark } from '../models/Bookmark';
import { User } from '../models/User';
import { BookmarksRepository } from '../repositories/BookmarksRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import { schemaBookmarkCreate } from '../validations/bookmarks/bookmarkCreate';

interface IBookmarkCreate {
  name: string;
  url: string;
  user_id: string;
  folder_id?: string;
}

class BookmarksService {
  private bookmarksRepository: Repository<Bookmark>;

  private usersRepository: Repository<User>;

  constructor() {
    this.bookmarksRepository = getCustomRepository(BookmarksRepository);
    this.usersRepository = getCustomRepository(UsersRepository);
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

    console.log(bookmark);

    return bookmark;
  }

  async show(id: string): Promise<Array<Bookmark>> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['bookmarks'],
    });

    if (!user) {
      throw new AppError('User not found');
    }

    return user.bookmarks;
  }
}

export { BookmarksService };
