import { TypeOf, z } from 'zod'

export const usernameParams = z.object({
  username: z.string(),
})

export type UsernameParams = TypeOf<typeof usernameParams>
