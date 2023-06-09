export type PostsTypes = {
  _id: string
  __v?: number
  active?: boolean
  createdAt?: string
  boost: boolean
  boostingEndDate?: string | null
  boostingStartDate?: string | null
  boostingBudget?: number | null
  client?: {
    _id: string
    customerID: string
    username: string
    firstName: string
  }
  content?: string
  creator?: {
    _id: string
    active: boolean
    createdAt: string
  }
  description: string
  groupID?: string
  permissionLevel: {
    permissionLevelName: string
  }
  platform: Array<{ platform: string }> | string
  postingDate: string
  scheduledDate?: string
  title: string
  updatedAt?: string
  url?: string
}
