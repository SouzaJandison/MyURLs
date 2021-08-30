import { getCustomRepository, Repository } from 'typeorm';

import { AppError } from '../../shared/errors/AppError';
import { Folder } from '../models/Folder';
import { FoldersRepository } from '../repositories/FoldersRepository';

interface IFolderCreate {
  name: string;
  color: string;
  user_id: string;
}

class FolderService {
  private foldersRepository: Repository<Folder>;

  constructor() {
    this.foldersRepository = getCustomRepository(FoldersRepository);
  }

  async create({ name, color, user_id }: IFolderCreate): Promise<Folder> {
    const folder = this.foldersRepository.create({
      name,
      color,
      user_id,
    });

    await this.foldersRepository.save(folder);

    return folder;
  }

  async show(id: string): Promise<Array<Folder>> {
    const folders = await this.foldersRepository.find({
      where: { user_id: id },
      relations: ['bookmarks'],
    });

    if (!folders) {
      throw new AppError('User not found');
    }

    return folders;
  }
}

export { FolderService };
