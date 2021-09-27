import { Bookmark } from '../infra/typeorm/models/Bookmark';
import { IBookmarkRepository } from '../repositories/IBookmarkRepository';

export class ListBookmarkService {
  constructor(private bookmarkRepository: IBookmarkRepository) {}

  async execute(id: string): Promise<Array<Bookmark>> {
    const bookmarks = this.bookmarkRepository.listAll(id);

    return bookmarks;
  }
}
