'use client'
import { useCallback, useState } from 'react'

import { Event, Platform } from '@/models/types'

import { useGlobalDialog } from '@/contexts'
import { eventsService, platformsService } from '@/services'

import { RegisterEventDialogContent, RegisterPlatformDialogContent } from '../components'
import { revalidateTag } from '@/helpers'

type UseAdminProps = {
  initialPlatforms: Platform[]
  initialEvents: Event[]
}

export const useAdmin = (props: UseAdminProps) => {
  const { events, deleteEvent, refreshEvents } = useEvents({ initialEvents: props.initialEvents })
  const { platforms, refreshPlatforms } = usePlatforms({ initialPlatforms: props.initialPlatforms })
  const { showRegisterEventDialog, showRegisterPlatformDialog } = useDialogs({
    refreshPlatforms,
    refreshEvents,
  })

  return {
    events,
    platforms,
    deleteEvent,
    showRegisterEventDialog,
    showRegisterPlatformDialog,
  }
}

type UsePlatformsProps = Pick<UseAdminProps, 'initialPlatforms'>

const usePlatforms = (props: UsePlatformsProps) => {
  const [platforms, setPlatforms] = useState<Platform[]>(props.initialPlatforms)

  const refreshPlatforms = useCallback(async () => {
    const { result } = await platformsService.getAll()
    if (result) setPlatforms(result)
  }, [])

  return { platforms, refreshPlatforms }
}

type UseEventsProps = Pick<UseAdminProps, 'initialEvents'>

const useEvents = (props: UseEventsProps) => {
  const [events, setEvents] = useState<Event[]>(props.initialEvents)

  const refreshEvents = useCallback(async () => {
    const { result } = await eventsService.getAll()
    if (result) setEvents(result)
  }, [])

  const deleteEvent = useCallback(
    async (eventId: Event['id']) => {
      await eventsService.delete(eventId)
      revalidateTag('events')
      refreshEvents()
    },
    [refreshEvents]
  )

  return { events, deleteEvent, refreshEvents }
}

type UseDialogsProps = {
  refreshPlatforms: () => void
  refreshEvents: () => void
}

const useDialogs = (props: UseDialogsProps) => {
  const { refreshPlatforms, refreshEvents } = props

  const { show } = useGlobalDialog()

  const showRegisterEventDialog = useCallback(
    (platforms: Platform[]) => {
      const dialogId = 'register-event'
      show({
        id: dialogId,
        children: (
          <RegisterEventDialogContent
            dialogId={dialogId}
            platforms={platforms}
            refreshEvents={refreshEvents}
          />
        ),
        maxWidth: 'xs',
        fullWidth: true,
      })
    },
    [refreshEvents, show]
  )

  const showRegisterPlatformDialog = useCallback(() => {
    const dialogId = 'register-platform'
    show({
      id: dialogId,
      children: (
        <RegisterPlatformDialogContent dialogId={dialogId} refreshPlatforms={refreshPlatforms} />
      ),
      maxWidth: 'xs',
      fullWidth: true,
    })
  }, [refreshPlatforms, show])

  return { showRegisterEventDialog, showRegisterPlatformDialog }
}
