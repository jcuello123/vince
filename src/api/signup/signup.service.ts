import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces';
import { getUserByUsername } from 'src/util/prisma.util';
import prisma from 'prisma/prisma';
import { SignupInfo } from './signup.controller';
import { ValidatorService } from 'src/services/validator/validator.service';
const bcrypt = require('bcrypt');

interface SignupResult {
  success: boolean;
  errors?: string[];
  user?: User;
}

@Injectable()
export class SignupService {
  constructor(private validatorService: ValidatorService) {}

  async signup(signupInfo: SignupInfo): Promise<SignupResult> {
    const { username, password } = signupInfo;
    const user = await getUserByUsername(username);

    if (user) {
      const res: SignupResult = {
        success: false,
        errors: ['Username already exists'],
      };

      return res;
    }

    const validationResult = this.validatorService.validateUser(
      username,
      password,
    );

    if (!validationResult.success) {
      const res: SignupResult = {
        success: false,
        errors: validationResult.error.issues.map((v) => v.message),
      };
      return res;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const res: SignupResult = {
      success: true,
      user: createdUser,
    };

    return res;
  }
}
