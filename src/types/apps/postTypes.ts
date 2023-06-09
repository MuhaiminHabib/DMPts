// export type InvoiceStatus = 'Paid' | string

import { UsersType } from './userTypes'

// export type PostsTypes = {
//   _id: string
//   ba: string
//   boost: string
//   client: string
//   content: string
//   creator: UsersType
//   description: string
//   fileName: string
//   groupID: string
//   permissionLevel: string
//   platform: string[]
//   postingDate: string
//   scheduledDate: string
//   boostingStartDate: string
//   boostingEndDate: string
//   boostingBudget: string
//   title: string
//   updatedAt: string
//   url: string
// }

export type PostsTypes = {
  _id?: string
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
    // Add other properties if available
  }
  content?: string
  creator?: {
    _id: string
    active: boolean
    createdAt: string
    // Add other properties if available
  }
  description: string
  groupID?: string
  permissionLevel: {
    permissionLevelName: string
    // Add other properties if available
  }
  platform: Array<{ platform: string }> | string
  postingDate: string
  scheduledDate?: string
  title: string
  updatedAt?: string
  url?: string
}
