// export type InvoiceStatus = 'Paid' | string

import { UsersType } from './userTypes'

// export type InvoiceLayoutProps = {
//   id: string | undefined
// }

// export type InvoiceClientType = {
//   name: string
//   address: string
//   company: string
//   country: string
//   contact: string
//   companyEmail: string
// }

// export type InvoiceType = {
//   id: number
//   name: string
//   total: number
//   avatar: string
//   service: string
//   dueDate: string
//   address: string
//   company: string
//   country: string
//   contact: string
//   avatarColor?: string
//   issuedDate: string
//   companyEmail: string
//   balance: string | number
//   invoiceStatus: InvoiceStatus
// }

// export type InvoicePaymentType = {
//   iban: string
//   totalDue: string
//   bankName: string
//   country: string
//   swiftCode: string
// }

// export type SingleInvoiceType = {
//   invoice: InvoiceType
//   paymentDetails: InvoicePaymentType
// }

export type PostsTypes = {
  _id: string
  ba: string
  boost: string
  client: string
  content: string
  creator: UsersType
  description: string
  fileName: string
  groupID: string
  permissionLevel: string
  platform: string[]
  postingDate: string
  scheduledDate: string
  boostingStartDate: string
  boostingEndDate: string
  boostingBudget: string
  title: string
  updatedAt: string
  url: string
}
