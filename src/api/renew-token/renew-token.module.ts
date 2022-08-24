import { Module } from '@nestjs/common';
import { TokenService } from 'src/services/token/token.service';
import { RenewTokenController } from './renew-token.controller';

@Module({
  providers: [TokenService],
  controllers: [RenewTokenController],
})
export class RenewTokenModule {}
