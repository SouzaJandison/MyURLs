import { ICreateBookmarkDTO } from '../dtos/ICreateBookmarkDTO';
import { Bookmark } from '../infra/typeorm/models/Bookmark';
import { IBookmarkRepository } from '../repositories/IBookmarkRepository';

export class CreateBookmarkService {
  constructor(private bookmarkRepository: IBookmarkRepository) {}

  async execute({ name, url, user_id }: ICreateBookmarkDTO): Promise<Bookmark> {
    const bookmark = this.bookmarkRepository.create({ name, url, user_id });

    return bookmark;
  }
}
