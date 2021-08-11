import { User } from '../../models/User';

interface IUserResponse {
  id: string;
  username: string;
  email: string;
  avatar: string;
}

export const userRender = {
  render(user: User): IUserResponse {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    };
  },
};
