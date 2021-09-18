import { getCustomRepository, Repository } from 'typeorm';

import { AppError } from '../../shared/errors/AppError';
import { Bookmark } from '../models/Bookmark';
import { Folder } from '../models/Folder';
import { User } from '../models/User';
import { BookmarksRepository } from '../repositories/BookmarksRepository';
import { FoldersRepository } from '../repositories/FoldersRepository';
import { UsersRepository } from '../repositories/UsersRepository';

class ReportService {
  private bookmarksRepository: Repository<Bookmark>;

  private foldersRepository: Repository<Folder>;

  private usersRepository: Repository<User>;

  constructor() {
    this.bookmarksRepository = getCustomRepository(BookmarksRepository);
    this.foldersRepository = getCustomRepository(FoldersRepository);
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async execute(id: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['bookmarks'],
    });

    if (!user) {
      throw new AppError('User not found');
    }

    const folders = await this.foldersRepository.find({
      where: { user_id: id },
      relations: ['bookmarks'],
    });

    const bookmarks = user.bookmarks.filter(bookmark => bookmark.folder_id);

    return {
      bookmarks,
      folders,
    };
  }
}

export { ReportService };
