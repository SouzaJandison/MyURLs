import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { User } from '../models/User';

export class UsersRepository implements IUsersRepository {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getRepository(User);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { id } });

    return user;
  }

  async create({ username, email, password }: ICreateUserDTO): Promise<User> {
    const user = this.usersRepository.create({
      username,
      email,
      password_hash: password,
    });

    await this.usersRepository.save(user);

    return user;
  }

  async save(user: User): Promise<void> {
    await this.usersRepository.save(user);
  }
}
