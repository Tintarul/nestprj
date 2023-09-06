import { Injectable } from '@nestjs/common';
import { Request } from 'express'; // Import Request from express

@Injectable()
export class SessionService {
  // Modify the set method to accept the request object
  set(req: Request, key: string, value: any): void {
    req.session[key] = value;
  }

  // Modify the get method to accept the request object
  get(req: Request, key: string): any {
    return req.session[key];
  }
}
