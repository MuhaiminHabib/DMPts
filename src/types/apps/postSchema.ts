import { z } from 'zod'

const fileSchema = z.object({
  name: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string(),
  size: z.number(),
  destination: z.string(),
  filename: z.string(),
  path: z.string(),
  buffer: z.string() // Depending on your setup, you might have the file's contents as a Buffer, or you might not have them at all.
})

export const zPost = z.object({
  _id: z.string().optional(),
  __v: z.number().optional(),
  title: z.string().min(5, 'title is required'),
  description: z.string(),
  platform: z.union([
    z.array(
      z.object({
        platform: z.string()
      })
    ),
    z.string()
  ]),
  postingDate: z.string(),
  boost: z.string(),
  scheduledDate: z.string().optional(),
  client: z.union([
    z.object({
      _id: z.string(),
      customerID: z.string(),
      username: z.string(),
      firstName: z.string()
    }),
    z.string()
  ]),
  creator: z
    .object({
      _id: z.string(),
      active: z.boolean(),
      createdAt: z.string()
    })
    .optional(),
  permissionLevel: z.object({ permissionLevelName: z.string() }).optional(),
  url: z.string().optional(),
  ba: z.string().optional(),
  boostingEndDate: z.string().nullable().optional(),
  boostingStartDate: z.string().nullable().optional(),
  boostingBudget: z.number().nullable().optional(),
  content: z.array(fileSchema).nullable().optional()
})

export const zPostForPostCreate = z.object({
  _id: z.string().optional(),
  __v: z.number().optional(),
  title: z.string(),
  description: z.string(),
  platform: z.union([
    z.array(
      z.object({
        platform: z.string()
      })
    ),
    z.string()
  ]),
  postingDate: z.string(),
  boost: z.string(),
  scheduledDate: z.string().optional(),
  client: z.union([
    z.object({
      _id: z.string(),
      customerID: z.string(),
      username: z.string(),
      firstName: z.string()
    }),
    z.string()
  ]),
  creator: z
    .object({
      _id: z.string(),
      active: z.boolean(),
      createdAt: z.string()
    })
    .optional(),
  permissionLevel: z.string(),
  url: z.string().optional(),
  ba: z.string().optional(),
  boostingEndDate: z.string().nullable().optional(),
  boostingStartDate: z.string().nullable().optional(),
  boostingBudget: z.number().nullable().optional(),
  content: z.array(fileSchema).nullable().optional()
})

export type Post = z.infer<typeof zPost>
