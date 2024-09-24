import { Platform, PlatformInput } from '@/models/types'

import { apiFetcher } from '../api'
import { catchResponseErrorMessage } from '../error'

const baseUrl = '/platform'

const createPlatform = async (platform: PlatformInput) => {
  try {
    const { data } = await apiFetcher<Platform[]>(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(platform),
    })
    return { result: data }
  } catch (error) {
    return { error: catchResponseErrorMessage(error) }
  }
}

const getPlatforms = async () => {
  try {
    const { data } = await apiFetcher<Platform[]>(baseUrl)
    return { result: data }
  } catch (error) {
    return { error: catchResponseErrorMessage(error), result: [] as Platform[] }
  }
}

export const platformsService = {
  create: createPlatform,
  getAll: getPlatforms,
}
