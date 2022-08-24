import { Injectable } from '@nestjs/common';
import { ZodError } from 'zod';
import { zUser } from './schema';

interface ValidationResult {
  success: boolean;
  data?: any;
  error?: ZodError;
}

@Injectable()
export class ValidatorService {
  validateUser(username: string, password: string): ValidationResult {
    return zUser.safeParse({ username, password });
  }
}
