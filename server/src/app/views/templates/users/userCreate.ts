import { User } from '../../../models/User';

interface IUserResponse {
  username: string;
  email: string;
  avatarUserUrl: string;
}

export const render = (user: User): IUserResponse => {
  return {
    username: user.username,
    email: user.email,
    avatarUserUrl: user.avata_user_url,
  };
};
