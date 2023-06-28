import { TRPCError } from '@trpc/server'
import { linkRepository } from './link.repository'
import { Context } from '../../context'
import { UsernameParams } from '../user/user.schema'
import { userRepository } from '../user/user.repository'
import {
  CreateLinkSchema,
  LinkParams,
  ReorderLinksSchema,
  UpdateLinkSchema,
} from './link.schema'
import { Links } from '@prisma/client'

const getLinks = async ({ ctx }: { ctx: Context }) => {
  try {
    const links = await linkRepository.getLinks(ctx.session?.user.id ?? '')

    return links
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    })
  }
}

const getLinksByUsername = async ({ input }: { input: UsernameParams }) => {
  try {
    const user = await userRepository.getUserByUsername(input)

    const links = await linkRepository.getLinks(user?.id ?? '')

    return links
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    })
  }
}

const createLink = async ({
  input,
  ctx,
}: {
  input: CreateLinkSchema
  ctx: Context
}) => {
  try {
    const userId = ctx.session?.user.id ?? ''
    const link = await linkRepository.createLink(input, userId)

    return link
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    })
  }
}

const updateLink = async ({
  input,
  ctx,
}: {
  input: UpdateLinkSchema
  ctx: Context
}) => {
  try {
    const userId = ctx.session?.user.id ?? ''
    const link = await linkRepository.updateLink(input, userId)

    return link
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    })
  }
}

const deleteLink = async ({ input }: { input: LinkParams }) => {
  try {
    const link = await linkRepository.deleteLink(input.linkId)

    return link
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    })
  }
}

const reorderLinks = async ({
  input,
  ctx,
}: {
  input: ReorderLinksSchema
  ctx: Context
}) => {
  try {
    const { oldIndex, newIndex } = input
    const userId = ctx.session?.user.id ?? ''
    const links = await linkRepository.getLinks(userId)
    let link: Links | undefined
    if (
      oldIndex >= 0 &&
      oldIndex < links.length &&
      newIndex >= 0 &&
      newIndex < links.length
    ) {
      link = links.splice(Number(oldIndex), 1)[0]

      links.splice(newIndex, 0, link!)

      await linkRepository.reorderLinks(links)
    }

    return links
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    })
  }
}

export const linkController = {
  getLinks,
  getLinksByUsername,
  createLink,
  updateLink,
  deleteLink,
  reorderLinks,
}
