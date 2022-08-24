import { Controller, Headers, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TokenService } from 'src/services/token/token.service';

@Controller('renew-token')
export class RenewTokenController {
  constructor(private tokenService: TokenService) {}

  @Post()
  renewToken(
    @Headers('userId') userId: string,
    @Headers('token') token: string,
    @Res() res: Response,
  ) {
    const id = parseInt(userId);
    const expired = this.tokenService.verifyExpiredToken(id, token);

    if (expired) {
      const token = this.tokenService.generateToken(id);
      res.status(HttpStatus.CREATED).json({ token });
    } else {
      res.status(HttpStatus.UNAUTHORIZED).send();
    }
  }
}
