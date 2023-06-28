import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

export const themeRouter = createTRPCRouter({
  getTheme: publicProcedure.query(async ({ ctx }) => {
    const theme = await ctx.prisma.theme.findFirst({
      where: {
        userId: ctx.session?.user.id,
      },
    })

    return theme
  }),

  getThemeByUsername: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { username: input.username },
      })

      const theme = await ctx.prisma.theme.findFirst({
        where: {
          userId: user ? user.id : null,
        },
      })

      return theme
    }),

  updateTheme: protectedProcedure
    .input(
      z.object({
        buttonType: z.string().optional(),
        buttonColor: z.string().optional(),
        buttonFontColor: z.string().optional(),
        shadowColor: z.string().optional(),
        backgroundPrimary: z.string().optional(),
        backgroundSecondary: z.string().optional(),
        backgroundType: z.string().optional(),
        fontColor: z.string().optional(),
        fontFamily: z.string().optional(),
        socialIconPosition: z.string().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      const theme = ctx.prisma.theme.upsert({
        create: {
          buttonType: input.buttonType,
          buttonColor: input.buttonColor,
          buttonFontColor: input.buttonFontColor,
          shadowColor: input.shadowColor,
          backgroundPrimary: input.backgroundPrimary,
          backgroundSecondary: input.backgroundSecondary,
          backgroundType: input.backgroundType ?? 'fill',
          fontColor: input.fontColor,
          fontFamily: input.fontFamily,
          socialIconPosition: input.socialIconPosition ?? 'top',
          userId: ctx.session.user.id,
        },
        where: {
          userId: ctx.session.user.id,
        },
        update: {
          buttonType: input.buttonType,
          buttonColor: input.buttonColor,
          buttonFontColor: input.buttonFontColor,
          shadowColor: input.shadowColor,
          backgroundPrimary: input.backgroundPrimary,
          backgroundSecondary: input.backgroundSecondary,
          backgroundType: input.backgroundType,
          fontColor: input.fontColor,
          fontFamily: input.fontFamily,
          socialIconPosition: input.socialIconPosition,
        },
      })

      return theme
    }),
})
