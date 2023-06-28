import { TypeOf, z } from 'zod'

export const createLinkSchema = z.object({
  type: z.string(),
  label: z.string(),
  content: z.string().optional(),
})

export const updateLinkSchema = z.object({
  label: z.string().optional(),
  content: z.string().optional(),
  active: z.boolean().optional(),
})

export const linkParams = z.object({
  linkId: z.string(),
})

export const reorderLinksSchema = z.object({
  newIndex: z.number(),
  oldIndex: z.number(),
  linkId: z.string(),
})

export type CreateLinkSchema = TypeOf<typeof createLinkSchema>
export type UpdateLinkSchema = TypeOf<typeof updateLinkSchema>
export type LinkParams = TypeOf<typeof linkParams>
export type ReorderLinksSchema = TypeOf<typeof reorderLinksSchema>
