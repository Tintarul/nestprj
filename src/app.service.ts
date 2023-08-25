import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  //Nu stiu exact ce sa fac aici asa ca o las
  getHello(): string {
    return 'Hello World!';
  }
}
