import { Bookmark } from '../../../models/Bookmark';

interface IBookmarkResponse {
  id: string;
  name: string;
  url: string;
}

export const render = (bookmark: Bookmark): IBookmarkResponse => {
  return {
    id: bookmark.id,
    name: bookmark.name,
    url: bookmark.url,
  };
};
