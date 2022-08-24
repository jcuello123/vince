import { Injectable } from '@nestjs/common';
const jwt = require('jsonwebtoken');

@Injectable()
export class TokenService {
  private readonly THIRTY_MINUTES = Math.floor(Date.now() / 1000) + 60 * 30;

  generateToken(userId: number): string {
    return jwt.sign(
      { data: userId, exp: this.THIRTY_MINUTES },
      process.env.TOKEN_SECRET,
    );
  }

  verifyToken(userId: number, token: string): boolean {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      return decoded.data === userId;
    } catch (error) {
      return false;
    }
  }

  verifyExpiredToken(userId: number, token: string): boolean {
    try {
      jwt.verify(token, process.env.TOKEN_SECRET);
      return false;
    } catch (error) {
      return error.message === 'jwt expired';
    }
  }
}
