import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import { Response } from 'express';

export class LoginInfo {
  username: string;
  password: string;
}

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  async login(@Body() loginInfo: LoginInfo, @Res() res: Response) {
    const result = await this.loginService.login(loginInfo);

    if (!result.success) {
      res.status(HttpStatus.BAD_REQUEST).json({ errors: result.errors });
    } else {
      res
        .status(HttpStatus.OK)
        .json({ token: result.token, userId: result.userId });
    }
  }
}
