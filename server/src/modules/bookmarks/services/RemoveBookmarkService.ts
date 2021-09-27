import { IBookmarkRepository } from '../repositories/IBookmarkRepository';

export class RemoveBookmarkService {
  constructor(private bookmarkRepository: IBookmarkRepository) {}

  async execute(id: string): Promise<void> {
    await this.bookmarkRepository.remove(id);
  }
}
