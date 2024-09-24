import { Event, EventInput } from '@/models/types'

import { apiFetcher } from '../api'
import { sortDates } from '@/helpers'
import { checkEventAlreadyOccurred } from '@/helpers/events'
import { catchResponseErrorMessage } from '../error'

const getAllEvents = async () => {
  try {
    const { data } = await apiFetcher<Event[]>('/event', {
      next: { tags: ['events'] },
    })
    const events = parseAndSortEventsDates(data)
    return { result: events }
  } catch (error) {
    return { error: catchResponseErrorMessage(error), result: [] as Event[] }
  }
}

const getEventsFromPlatform = async (platform: number) => {
  try {
    const { data } = await apiFetcher<Event[]>(`/event/platform/${platform}`, {
      next: { tags: ['platform-events'] },
    })
    const eventsWithParsedAndSortedDates = parseAndSortEventsDates(data)
    const events = filterAlreadyOccurredEvents(eventsWithParsedAndSortedDates)
    return [events] as const
  } catch (error) {
    return [[] as Event[], catchResponseErrorMessage(error)] as const
  }
}

const createEvent = async (event: EventInput) => {
  try {
    const { data } = await apiFetcher<Event>(`/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...event, dates: sortDates(event.dates) }),
    })
    return { result: data }
  } catch (error) {
    return { error: catchResponseErrorMessage(error) }
  }
}

const removeEvent = async (eventId: Event['id']) => {
  try {
    await apiFetcher(`/event/${eventId}`, { method: 'DELETE' })
    return
  } catch (error) {
    return { error: catchResponseErrorMessage(error) }
  }
}

export const eventsService = {
  create: createEvent,
  delete: removeEvent,
  getAll: getAllEvents,
  getAllFromPlatform: getEventsFromPlatform,
}

function filterAlreadyOccurredEvents(events: Event[]) {
  return events.filter(event => !checkEventAlreadyOccurred(event))
}

function parseAndSortEventsDates(events: Event[]): Event[] {
  return events.map(event => ({
    ...event,
    dates: sortEventDates(event.dates.map(date => new Date(date))),
  }))
}

function sortEventDates(eventDates: Date[], order: 'asc' | 'desc' = 'asc') {
  return eventDates.sort((a, b) => {
    if (order === 'asc') return a.getTime() - b.getTime()
    return b.getTime() - a.getTime()
  })
}
