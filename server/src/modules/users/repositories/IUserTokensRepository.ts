import { UserToken } from '../infra/typeorm/models/UserToken';

export interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
