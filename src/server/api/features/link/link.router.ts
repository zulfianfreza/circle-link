import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '~/server/api/trpc'
import { linkController } from './link.controller'
import { usernameParams } from '../user/user.schema'
import {
  createLinkSchema,
  linkParams,
  reorderLinksSchema,
  updateLinkSchema,
} from './link.schema'

export const linkRouter = createTRPCRouter({
  getLinks: publicProcedure.query(({ ctx }) =>
    linkController.getLinks({ ctx })
  ),

  getLinksByUsername: publicProcedure
    .input(usernameParams)
    .query(({ input }) => linkController.getLinksByUsername({ input })),

  createLink: protectedProcedure
    .input(createLinkSchema)
    .mutation(({ input, ctx }) => linkController.createLink({ input, ctx })),

  updateLink: protectedProcedure
    .input(updateLinkSchema)
    .mutation(({ input, ctx }) => linkController.updateLink({ input, ctx })),

  deleteLink: protectedProcedure.input(linkParams).mutation(({ input }) => {
    linkController.deleteLink({ input })
  }),

  reorderLinks: protectedProcedure
    .input(reorderLinksSchema)
    .mutation(({ input, ctx }) => linkController.reorderLinks({ input, ctx })),
})
