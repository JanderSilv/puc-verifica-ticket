import { apiFetcher } from './api.js'
import '../models/index.js'

const baseUrl = '/platform'

/**
 * Creates a new platform.
 * @param {Object} platform - The platform object.
 * @param {string} platform.name - The name of the platform.
 * @param {string} platform.image - The image URL of the platform.
 * @returns {Promise<FetcherResponse<T>>} - The response from the fetch request.
 */
const create = async platform =>
  await apiFetcher(baseUrl, {
    method: 'POST',
    body: JSON.stringify(platform),
  })

/**
 * Lists all platforms.
 * @returns {Promise<FetcherResponse<Platform[]>>} - The response from the fetch request.
 */
const list = async () => await apiFetcher(baseUrl)

/**
 * Removes a platform.
 * @param {string} id - The id of the platform to remove.
 * @returns {Promise<FetcherResponse<T>>} - The response from the fetch request.
 */
const remove = async id => await apiFetcher(`${baseUrl}/${id}`, { method: 'DELETE' })

export const platformsService = {
  create,
  list,
  remove,
}
