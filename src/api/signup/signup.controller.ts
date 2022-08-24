import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { SignupService } from './signup.service';
import { Response } from 'express';

export class SignupInfo {
  username: string;
  password: string;
}

@Controller('signup')
export class SignupController {
  constructor(private signupService: SignupService) {}

  @Post()
  async signup(@Body() signupInfo: SignupInfo, @Res() res: Response) {
    const result = await this.signupService.signup(signupInfo);

    if (!result.success) {
      if (result.errors[0] === 'Username already exists') {
        res
          .status(HttpStatus.CONFLICT)
          .json({ user: null, errors: result.errors });
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: result.errors });
      }
    } else {
      res.status(HttpStatus.CREATED).json({ user: result.user });
    }
  }
}
