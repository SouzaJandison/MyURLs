import { getRepository, Repository } from 'typeorm';

import { IUserTokensRepository } from '../../../repositories/IUserTokensRepository';
import { UserToken } from '../models/UserToken';

export class UserTokensRepository implements IUserTokensRepository {
  private userTokensRepository: Repository<UserToken>;

  constructor() {
    this.userTokensRepository = getRepository(UserToken);
  }

  async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.userTokensRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  async generate(user_id: string): Promise<UserToken> {
    const userToken = this.userTokensRepository.create({ user_id });

    await this.userTokensRepository.save(userToken);

    return userToken;
  }
}
