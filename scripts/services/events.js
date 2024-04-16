import { apiFetcher } from './api.js'
import '../models/index.js'

const baseUrl = '/event'

/**
 * Lists all events of a platform.
 * @param {string} platformId - The id of the platform to list events for.
 * @returns {Promise<FetcherResponse<PlatformEvent[]>>} - The response from the fetch request.
 */
const list = async platformId => await apiFetcher(`${baseUrl}/platform/${platformId}`)

export const eventsService = {
  list,
}
