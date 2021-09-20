import { IUpdateBookmarkDTO } from '../dtos/IUpdateBookmarkDTO';
import { IBookmarkRepository } from '../repositories/IBookmarkRepository';

export class UpdateBookmarkService {
  constructor(private bookmarksRepository: IBookmarkRepository) {}

  async execute({ id, name, url }: IUpdateBookmarkDTO): Promise<void> {
    await this.bookmarksRepository.update({ id, name, url });
  }
}
