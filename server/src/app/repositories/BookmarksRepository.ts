import { EntityRepository, Repository } from 'typeorm';

import { Bookmark } from '../models/Bookmark';

@EntityRepository(Bookmark)
class BookmarksRepository extends Repository<Bookmark> {}

export { BookmarksRepository };
