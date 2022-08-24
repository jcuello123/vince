import prisma from 'prisma/prisma';

export const getUserByUsername = async (username: string) => {
  return await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: 'insensitive',
      },
    },
  });
};
