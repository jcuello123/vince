import { Module } from '@nestjs/common';
import { SignupModule } from './api/signup/signup.module';
import { LoginModule } from './api/login/login.module';
import { TokenService } from './services/token/token.service';
import { TokenModule } from './services/token/token.module';
import { RenewTokenModule } from './api/renew-token/renew-token.module';

@Module({
  imports: [SignupModule, LoginModule, TokenModule, RenewTokenModule],
  controllers: [],
  providers: [TokenService],
})
export class AppModule {}
