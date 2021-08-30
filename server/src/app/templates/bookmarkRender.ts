import { Bookmark } from '../models/Bookmark';

interface IBookmarkResponse {
  id: string;
  name: string;
  url: string;
  folder_id: string;
}

export const bookmarkRender = {
  render(bookmark: Bookmark): IBookmarkResponse {
    return {
      id: bookmark.id,
      name: bookmark.name,
      url: bookmark.url,
      folder_id: bookmark.folder_id,
    };
  },

  renderMany(bookmarks: Bookmark[]): Array<IBookmarkResponse> {
    return bookmarks.map(bookmark => this.render(bookmark));
  },
};
