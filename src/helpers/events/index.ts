import { isFuture } from 'date-fns'
import { Event } from '@/models/types'

export const checkEventAlreadyOccurred = (event: Event) => {
  const lastEventDate = event.dates.at(-1)

  if (!lastEventDate) return false

  return !isFuture(lastEventDate)
}
