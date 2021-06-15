import { getCustomRepository, Repository } from 'typeorm';

import { AppError } from '../../shared/errors/AppError';
import { Bookmark } from '../models/Bookmark';
import { User } from '../models/User';
import { BookmarksRepository } from '../repositories/BookmarksRepository';
import { UsersRepository } from '../repositories/UsersRepository';

interface IBookmarkCreate {
  name: string;
  url: string;
  user_id: string;
  folder_id?: string;
}

interface IBookmarkUpdate {
  id: string;
  name: string;
  url: string;
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
    const bookmark = this.bookmarksRepository.create({
      name,
      url,
      user_id,
      folder_id,
    });

    await this.bookmarksRepository.save(bookmark);

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

  async delete(id: string): Promise<void> {
    const bookmark = await this.bookmarksRepository.findOne({ id });

    if (!bookmark) {
      throw new AppError('Bookmark not found');
    }

    await this.bookmarksRepository.remove(bookmark);
  }

  async update({ id, name, url }: IBookmarkUpdate): Promise<void> {
    const { affected } = await this.bookmarksRepository
      .createQueryBuilder()
      .update(Bookmark)
      .set({ name, url })
      .where('id = :id', { id })
      .execute();

    if (affected === 0) {
      throw new AppError(
        'it was not possible to perform the update the bookmark',
      );
    }
  }
}

export { BookmarksService };
