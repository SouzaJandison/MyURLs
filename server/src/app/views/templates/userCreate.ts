import { User } from '../../models/User';

interface IUserResponse {
  id: string;
  username: string;
  email: string;
  avatarUserUrl: string;
}

export const render = (user: User): IUserResponse => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    avatarUserUrl: user.avata_user_url,
  };
};
