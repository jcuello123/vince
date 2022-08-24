import { Module } from '@nestjs/common';
import { TokenService } from 'src/services/token/token.service';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService, TokenService],
})
export class LoginModule {}
