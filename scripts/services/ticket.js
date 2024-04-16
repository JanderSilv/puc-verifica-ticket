import { apiFetcher } from './api.js'
import '../models/ticket.js'

const baseUrl = '/ticket'

/**
 * Verifies a ticket.
 * @param {TicketInput} ticket - The ticket to verify.
 * @returns {Promise<FetcherResponse<TicketVerificationResult>>} - The response from the fetch request.
 */
const verify = async ticket =>
  apiFetcher(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticket),
  })

export const ticketsService = {
  verify,
}
