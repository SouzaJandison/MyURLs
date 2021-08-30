import { Request, Response } from 'express';

import { AppError } from '../../shared/errors/AppError';
import { FolderService } from '../services/FoldersService';
import { folderRender } from '../templates/folderRender';
import { schemaFolderCreate } from '../validations/folderSchema';

class FoldersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, color } = request.body;
    const { id } = request.user;

    try {
      await schemaFolderCreate.validate(
        {
          name,
          color,
          user_id: id,
        },
        { abortEarly: false },
      );
    } catch (error) {
      throw new AppError(error);
    }

    const foldersService = new FolderService();

    const folder = await foldersService.create({
      name,
      color,
      user_id: id,
    });

    return response.status(201).json(folderRender.render(folder));
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const foldersService = new FolderService();

    const folders = await foldersService.show(id);

    return response.json(folderRender.renderMany(folders));
  }
}

export { FoldersController };
