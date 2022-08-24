import { z } from 'zod';

const maxHelper = (field: string, length: number) => {
  return `${field} must be at most ${length} characters long`;
};

const minHelper = (field: string, length: number) => {
  return `${field} must be at least ${length} characters long`;
};

export const zUser = z.object({
  username: z
    .string()
    .min(3, minHelper('Username', 3))
    .max(20, maxHelper('Username', 20))
    .regex(
      new RegExp('^[a-zA-Z0-9]*$'),
      'Username must contain only letters and numbers',
    ),
  password: z
    .string()
    .min(5, minHelper('Password', 5))
    .max(50, maxHelper('Password', 50))
    .regex(
      new RegExp('.*[A-Z].*'),
      'Password must contain at least one capital letter',
    )
    .regex(
      new RegExp('.*[-!@#$%^&<>?;:*()_+|~=`{}[].*'),
      'Password must contain at least one of the following symbols: .*[-!@#$%^&<>?;:*()_+|~=`{}[].* ',
    ),
});
