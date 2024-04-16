/**
 * Represents the input data for creating a ticket.
 * @typedef {Object} TicketInput
 * @property {PlatformEvent['id']} event_id - The event to create the ticket for.
 * @property {string} code - The code of the ticket.
 * @property {string} contact_email - The contact email for the ticket.
 */

/**
 * Represents the result of verifying a ticket.
 * @typedef {Object} TicketVerificationResult
 * @property {boolean | 'owner'} matches - Whether the ticket was already registered.
 * @property {string[]} contact_emails - The contact emails of the ticket.
 */
