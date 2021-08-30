import { Bookmark } from '../models/Bookmark';
import { Folder } from '../models/Folder';

interface IBookmarks {
  id: string;
  name: string;
  url: string;
  folder_id: string;
}

interface IFolderResponse {
  id: string;
  name: string;
  color: string;
  bookmarks?: IBookmarks[];
}

const bookmarksRender = (bookmarks: Bookmark[]): Array<IBookmarks> => {
  return bookmarks.map(bookmark => {
    return {
      id: bookmark.id,
      name: bookmark.name,
      url: bookmark.url,
      folder_id: bookmark.folder_id,
    };
  });
};

export const folderRender = {
  render(folder: Folder): IFolderResponse {
    return {
      id: folder.id,
      name: folder.name,
      color: folder.color,
    };
  },
  renderMany(folders: Folder[]): Array<IFolderResponse> {
    return folders.map(folder => {
      return {
        id: folder.id,
        name: folder.name,
        color: folder.color,
        bookmarks: bookmarksRender(folder.bookmarks),
      };
    });
  },
};
