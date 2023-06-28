import { prisma } from '~/server/db'
import { CreateLinkSchema, UpdateLinkSchema } from './link.schema'
import { Links } from '@prisma/client'

const getLinks = async (userId: string) => {
  const links = await prisma.links.findMany({
    where: {
      userId: userId,
    },
    orderBy: [{ index: 'asc' }],
  })

  return links
}

const getLinksByUsername = async (userId: string) => {
  const links = await prisma.links.findMany({
    where: {
      userId: userId,
    },
    orderBy: [{ index: 'asc' }],
  })

  return links
}

const createLink = async (input: CreateLinkSchema, userId: string) => {
  const index = await findPosition(userId)
  const links = prisma.links.create({
    data: {
      type: input.type,
      label: input.label,
      content: input.content,
      active: true,
      index,
      userId: userId,
    },
  })

  return links
}

const findPosition = async (userId: string) => {
  const find = await prisma.links.findMany({
    where: {
      userId: userId,
    },
  })

  return find.length
}

const updateLink = async (input: UpdateLinkSchema, linkId: string) => {
  const link = prisma.links.update({
    where: {
      id: linkId,
    },
    data: {
      label: input.label,
      content: input.content,
      active: input.active,
    },
  })

  return link
}

const deleteLink = async (linkId: string) => {
  const link = prisma.links.delete({
    where: {
      id: linkId,
    },
  })

  return link
}

const reorderLinks = async (links: Links[]) => {
  for (let i = 0; i < links.length; i++) {
    links[i]!.index = i
    await prisma.links.update({
      where: {
        id: links[i]?.id,
      },
      data: {
        index: i,
      },
    })
  }
  return links
}

export const linkRepository = {
  getLinks,
  getLinksByUsername,
  createLink,
  findPosition,
  updateLink,
  deleteLink,
  reorderLinks,
}
