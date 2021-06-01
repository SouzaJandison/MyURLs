import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

interface IStorageTypes {
  [key: string]: multer.StorageEngine;
}

const uploadsFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

const storageTypes: IStorageTypes = {
  disk: multer.diskStorage({
    destination: uploadsFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

export const uploadsConfig = {
  uploadsFolder,

  multer: {
    dest: uploadsFolder,

    storage: storageTypes[process.env.STORAGE_DRIVER],

    limits: {
      fileSize: 2 * 1024 * 1024,
    },

    fileFilter: (request, file, callcack) => {
      const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];

      if (allowedMimes.includes(file.mimetype)) {
        callcack(null, true);
      } else {
        callcack(new Error('Invalid file type.'));
      }
    },
  } as multer.Options,
};
