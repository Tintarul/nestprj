import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException  } from '@nestjs/common';

@Injectable()
export class UserPipePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'string') {
      throw new BadRequestException('Accept decat string');
    }
    return value;
  }
}
