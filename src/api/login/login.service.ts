import { Injectable } from '@nestjs/common';
import { TokenService } from 'src/services/token/token.service';
import { getUserByUsername } from 'src/util/prisma.util';
import { LoginInfo } from './login.controller';
const bcrypt = require('bcrypt');

interface LoginResult {
  success: boolean;
  token?: string;
  errors?: string[];
  userId?: number;
}

@Injectable()
export class LoginService {
  constructor(private tokenService: TokenService) {}

  async login(loginInfo: LoginInfo): Promise<LoginResult> {
    let result: LoginResult = {
      success: false,
      errors: ['Invalid username or password'],
    };

    const user = await getUserByUsername(loginInfo.username);

    if (!user) {
      return result;
    }

    const isPasswordMatch = await bcrypt.compare(
      loginInfo.password,
      user.password,
    );

    if (!isPasswordMatch) {
      return result;
    }

    const token = this.tokenService.generateToken(user.id);

    result.success = true;
    result.token = token;
    result.userId = user.id;
    result.errors = [];

    return result;
  }
}
