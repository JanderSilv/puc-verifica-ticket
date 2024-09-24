import { ENV } from '@/config'
import { createInstance } from '@/helpers/fetcher'

export const apiFetcher = createInstance(ENV.NEXT_PUBLIC_API_URL || '')
