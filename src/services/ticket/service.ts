import { TicketInput, TicketResult } from '@/models/types'
import { apiFetcher } from '../api'

export const verifyTicket = async (ticket: TicketInput) =>
  apiFetcher<TicketResult>(`/ticket`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticket),
  })

export const ticketService = {
  verify: verifyTicket,
}
