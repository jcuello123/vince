import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { ValidatorService } from 'src/services/validator/validator.service';

@Module({
  controllers: [SignupController],
  providers: [SignupService, ValidatorService],
})
export class SignupModule {}
