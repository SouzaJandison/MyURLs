import { ICreateBookmarkDTO } from '../dtos/ICreateBookmarkDTO';
import { IUpdateBookmarkDTO } from '../dtos/IUpdateBookmarkDTO';
import { Bookmark } from '../infra/typeorm/models/Bookmark';

export interface IBookmarkRepository {
  findById(id: string): Promise<Bookmark | undefined>;
  listAll(id: string): Promise<Array<Bookmark>>;
  create(data: ICreateBookmarkDTO): Promise<Bookmark>;
  update(data: IUpdateBookmarkDTO): Promise<void>;
  remove(id: string): Promise<void>;
}
