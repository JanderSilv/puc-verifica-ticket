'use client'
import Image from 'next/image'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'

import { Event, Platform } from '@/models/types'

import { checkEventAlreadyOccurred } from '@/helpers/events'
import { useAdmin } from './hooks'

import { Icon, Logo } from '@/components/shared'

export type AdminProps = {
  platforms: Platform[]
  events: Event[]
}

export const Admin = (props: AdminProps) => {
  const { platforms: initialPlatforms, events: initialEvents } = props

  const { events, platforms, deleteEvent, showRegisterEventDialog, showRegisterPlatformDialog } =
    useAdmin({
      initialPlatforms,
      initialEvents,
    })

  return (
    <Box padding={4}>
      <Logo />

      <Typography component="h1" variant="h2" marginTop={2}>
        Admin
      </Typography>

      <Box marginTop={4}>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Typography component="h2" variant="h3">
            Plataformas
          </Typography>

          <Button variant="outlined" onClick={() => showRegisterPlatformDialog()}>
            Cadastrar
          </Button>
        </Stack>

        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          gap={2}
          marginTop={2}
        >
          {platforms.map(platform => (
            <Card
              key={platform.name}
              sx={{
                maxWidth: 250,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                height: '100%',
              }}
            >
              {platform.image && (
                <Image
                  key={platform.name}
                  src={platform.image}
                  alt={platform.name}
                  width="250"
                  height="105"
                  sizes="100vw"
                  style={{ objectFit: 'contain' }}
                />
              )}
              <CardContent>
                <Typography component="h3" variant="h4">
                  {platform.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Stack direction="row" justifyContent="space-between" spacing={2} marginTop={4}>
          <Typography component="h2" variant="h3">
            Eventos
          </Typography>

          <Button variant="outlined" onClick={() => showRegisterEventDialog(platforms)}>
            Cadastrar
          </Button>
        </Stack>

        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          gap={2}
          marginTop={2}
        >
          {events.map(event => (
            <Card
              key={event.name}
              sx={{
                maxWidth: 250,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                height: '100%',
              }}
            >
              {event.image && (
                <Image
                  src={event.image}
                  alt={event.name}
                  width="250"
                  height="105"
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                />
              )}
              <CardContent>
                <Typography component="h3" variant="h4" marginBottom={1}>
                  {event.name}
                </Typography>

                <OcurredEventChip event={event} />
              </CardContent>
              <CardActions>
                <IconButton
                  color="error"
                  onClick={clickEvent => clickEvent.detail === 2 && deleteEvent(event.id)}
                >
                  <Icon name="Trash" size={20} />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

const OcurredEventChip = ({ event }: { event: Event }) => {
  const eventAlreadyOcurred = checkEventAlreadyOccurred(event)

  return (
    <Chip
      label={eventAlreadyOcurred ? 'Ocorrido' : 'Ativo'}
      color={eventAlreadyOcurred ? undefined : 'success'}
    />
  )
}
