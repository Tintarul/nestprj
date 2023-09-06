import { SessionData } from 'express-session';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

declare module 'express' {
  interface Request {
    session: SessionData;
  }
interface Multer {
    single(fieldname: string): any;
}
}

declare module '@nestjs/common' {
    interface MulterOptions {
        dest: string;
    }
}

