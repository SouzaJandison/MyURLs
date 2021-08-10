import { User } from '../../models/User';

interface IUserResponse {
  username: string;
  email: string;
  avatar: string;
}

export const userRender = {
  render(user: User): IUserResponse {
    return {
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    };
  },
};
