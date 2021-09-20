import { getRepository, Repository } from 'typeorm';

import { AppError } from '../../../../../shared/errors/AppError';
import { User } from '../../../../users/infra/typeorm/models/User';
import { ICreateBookmarkDTO } from '../../../dtos/ICreateBookmarkDTO';
import { IUpdateBookmarkDTO } from '../../../dtos/IUpdateBookmarkDTO';
import { IBookmarkRepository } from '../../../repositories/IBookmarkRepository';
import { Bookmark } from '../models/Bookmark';

export class BookmarksRepository implements IBookmarkRepository {
  private bookmarksRepository: Repository<Bookmark>;

  private usersRepository: Repository<User>;

  constructor() {
    this.bookmarksRepository = getRepository(Bookmark);
    this.usersRepository = getRepository(User);
  }

  async findById(id: string): Promise<Bookmark | undefined> {
    const bookmark = await this.bookmarksRepository.findOne({ where: { id } });

    return bookmark;
  }

  async listAll(id: string): Promise<Array<Bookmark>> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['bookmarks'],
    });

    if (!user) {
      throw new AppError('User not found');
    }

    return user.bookmarks;
  }

  async create({ name, url, user_id }: ICreateBookmarkDTO): Promise<Bookmark> {
    const bookmark = this.bookmarksRepository.create({ name, url, user_id });

    await this.bookmarksRepository.save(bookmark);

    return bookmark;
  }

  async update({ id, name, url }: IUpdateBookmarkDTO): Promise<void> {
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

  async remove(id: string): Promise<void> {
    const bookmark = await this.bookmarksRepository.findOne({ where: { id } });

    if (!bookmark) {
      throw new AppError('Bookmark not found');
    }

    await this.bookmarksRepository.remove(bookmark);
  }
}
