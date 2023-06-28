import { prisma } from '~/server/db'
import { UsernameParams } from './user.schema'

const getUserByUsername = async (input: UsernameParams) => {
  const user = await prisma.user.findFirst({
    where: { username: input.username },
  })

  return user
}

export const userRepository = {
  getUserByUsername,
}
