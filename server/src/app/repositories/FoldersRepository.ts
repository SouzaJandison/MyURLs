import { EntityRepository, Repository } from 'typeorm';

import { Folder } from '../models/Folder';

@EntityRepository(Folder)
class FoldersRepository extends Repository<Folder> {}

export { FoldersRepository };
