import { diskStorage } from 'multer';
import { extname } from 'path';

export const logoStorage = (pathUrl : string)  => {
    return diskStorage({
      destination: pathUrl,
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
      },
    });
}

export const imageFileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
    cb(new Error('Solo se permiten imágenes (jpg, jpeg, png, webp)'), false);
  } else {
    cb(null, true);
  }
};
