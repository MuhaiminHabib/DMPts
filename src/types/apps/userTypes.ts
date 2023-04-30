// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// export type UsersType = {
//   id: number
//   role: string
//   email: string
//   status: string
//   avatar: string
//   billing: string
//   company: string
//   country: string
//   contact: string
//   fullName: string
//   username: string
//   currentPlan: string
//   avatarColor?: ThemeColor
// }

export type UsersType = {
  _id: string
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  passwordVerify: string
  avatar?: string
  active: boolean
  creator: string
  customerID: string
  dm: []
  type: 'BA' | 'DM' | 'C' | 'CM'
  avatarColor?: ThemeColor
}

export type ProjectListDataType = {
  id: number
  img: string
  hours: string
  totalTask: string
  projectType: string
  projectTitle: string
  progressValue: number
  progressColor: ThemeColor
}
