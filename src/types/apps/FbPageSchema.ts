import { z } from 'zod'

export const zFbPage = z.object({
  access_token: z.string(),
  category: z.string(),
  id: z.string(),
  name: z.string(),
  tasks: z.array(z.string()),
  user: z.string(),
  _id: z.string()
})

export type FbPage = z.infer<typeof zFbPage>
