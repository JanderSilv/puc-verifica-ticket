import { Event } from '.'

export type Ticket = {
  id: string
  contactEmails: string[]
}

export type TicketInput = {
  eventId: Event['id']
  code: string
  contactEmail: string
}

export type TicketResult = {
  matches: boolean | 'owner'
  contactEmails: string[]
}
