import { z } from 'zod'
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '~/server/api/trpc'

export const userRouter = createTRPCRouter({
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    })

    return user
  }),
  getProfileByUsername: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { username: input.username },
      })

      return user
    }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        profileTitle: z.string().optional(),
        bio: z.string().optional(),
        profileImage: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.upsert({
        create: {
          profileTitle: input.profileTitle,
          bio: input.bio,
          profileImage: input.profileImage,
        },
        where: {
          email: ctx.session.user.email ?? undefined,
        },
        update: {
          profileTitle: input.profileTitle,
          bio: input.bio,
          profileImage: input.profileImage,
        },
      })
      return user
    }),

  updateViewCount: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const count = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      })

      const countView = await ctx.prisma.user.upsert({
        create: {
          viewCount: 0,
        },
        update: {
          viewCount: count?.viewCount ? 1 : { increment: 1 },
        },
        where: {
          id: input.id,
        },
      })

      return countView
    }),

  changeUsername: protectedProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.update({
        data: {
          username: input.username,
        },
        where: {
          id: ctx.session.user.id ?? undefined,
        },
      })

      return user
    }),
})
