import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Cererea a fost primita');
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`Cererea a durat ${Date.now() - now} ms pe ruta ${context.getHandler().name}`)),
      );
  }
}
