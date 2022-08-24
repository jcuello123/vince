import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { TokenService } from 'src/services/token/token.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    const token = req.header('token');
    const userId = parseInt(req.header('userId'));
    const authorized = this.tokenService.verifyToken(userId, token);

    if (!authorized) {
      throw new UnauthorizedException();
    }

    return next.handle();
  }
}
