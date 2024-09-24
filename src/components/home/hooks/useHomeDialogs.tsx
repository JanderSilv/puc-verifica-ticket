'use client'
import React, { Fragment, useCallback } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'

import { Event, Platform, TicketResult } from '@/models/types'

import { useGlobalDialog, useTicketContext } from '@/contexts'
import { ticketService } from '@/services/ticket/service'
import { TicketVerificationValues, makeTicketVerificationValidationSchema } from '../validations'

import { Icon } from '@/components/shared'

export const useHomeDialogs = () => {
  const { show } = useGlobalDialog()

  const showPlatformDialog = useCallback(
    (props: PlatformDialogContentProps) => {
      show({
        id: 'platform',
        children: <PlatformDialogContent {...props} />,
        maxWidth: 'lg',
        fullWidth: true,
      })
    },
    [show]
  )

  const showTicketVerificationDialog = useCallback(() => {
    show({
      id: 'ticket_verification',
      children: <TicketVerificationDialogContent />,
      maxWidth: 'sm',
    })
  }, [show])

  return {
    showPlatformDialog,
    showTicketVerificationDialog,
  }
}

type PlatformDialogContentProps = {
  platform: Platform
  events: Event[]
}

export const PlatformDialogContent = (props: PlatformDialogContentProps) => {
  const { platform, events } = props

  const { setData } = useTicketContext()
  const { showTicketVerificationDialog } = useHomeDialogs()

  return (
    <>
      {platform.image && (
        <Image
          src={platform.image}
          alt={platform.name}
          width="500"
          height="100"
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: 100,
            marginInline: 'auto',
            objectFit: 'contain',
          }}
        />
      )}

      <DialogTitle component="h2" variant="h3" fontWeight="bold">
        Eventos da {platform.name}
      </DialogTitle>

      <DialogContent>
        <DialogContentText>Selecione o evento do seu ingresso</DialogContentText>

        <Box display="grid" gridTemplateColumns="repeat(auto-fill, 250px)" gap={2} marginTop={2}>
          {events.map(event => (
            <Card key={event.name}>
              <CardActionArea
                onClick={() => {
                  setData(prevData => ({ ...prevData, event }))
                  showTicketVerificationDialog()
                }}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  height: '100%',
                }}
              >
                <Image
                  src={event.image}
                  alt={event.name}
                  width="250"
                  height="105"
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography component="h4" variant="h5">
                    {event.name}
                  </Typography>

                  <Box
                    component="ul"
                    aria-label="Datas do evento"
                    marginBottom={0}
                    paddingLeft="1.2rem"
                  >
                    {event.dates.map(date => (
                      <li key={date.toISOString()}>
                        <Typography component="p" variant="body2" color="text.secondary">
                          {new Date(date).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </Typography>
                      </li>
                    ))}
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </DialogContent>
    </>
  )
}

export const TicketVerificationDialogContent = () => {
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm<TicketVerificationValues>({
    resolver: zodResolver(makeTicketVerificationValidationSchema()),
    defaultValues: {
      shareEmail: false,
    },
  })
  const { data } = useTicketContext()
  const { show, hideAll } = useGlobalDialog()

  const onSubmit = async (values: TicketVerificationValues) => {
    const { data: ticketResult } = await ticketService.verify({
      code: values.identifier,
      eventId: data.event.id,
      contactEmail: values.email,
    })

    hideAll()

    show({
      id: 'result',
      children: <ResultDialogContent contactEmail={values.email} {...ticketResult} />,
      maxWidth: 'sm',
      closable: false,
    })
  }

  return (
    <>
      <DialogTitle component="h2" variant="h3" fontWeight="bold">
        Verificação do Ingresso
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Para verificar seu ingresso, precisamos do identificador, além do seu email para que
          possamos te avisar caso o seu ingresso seja cadastrado por outra pessoa posteriormente.
        </DialogContentText>

        <Stack component="form" onSubmit={handleSubmit(onSubmit)} marginTop={2} spacing={2}>
          <Stack direction="row" spacing={1}>
            <TextField
              label="Identificador do Ingresso"
              {...register('identifier')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon name="Barcode" size={20} />
                  </InputAdornment>
                ),
              }}
              error={!!errors.identifier}
              helperText={errors.identifier?.message}
              size="small"
              disabled={isSubmitting}
              fullWidth
            />
            <Tooltip title="O identificador é o valor próximo/contido no código de barras ou QR Code do seu ingresso.">
              <Typography
                component="span"
                display="inline-block"
                sx={{
                  '&&': {
                    marginTop: '0.8rem',
                  },
                }}
              >
                <Icon name="Info" size={22} />
              </Typography>
            </Tooltip>
          </Stack>

          <Alert icon={<Icon name="LockKey" size={22} />} severity="info">
            Utilizamos criptografia para garantir que ninguém descubra o identificador do seu
            ingresso, nem mesmo nós.
          </Alert>

          <TextField
            label="Email"
            {...register('email')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon name="Envelope" size={20} />
                </InputAdornment>
              ),
            }}
            error={!!errors.email}
            helperText={errors.email?.message}
            size="small"
            disabled={isSubmitting}
            fullWidth
          />

          <FormControl error={!!errors.shareEmail} required>
            <FormControlLabel
              control={<Checkbox size="small" {...register('shareEmail')} />}
              label="Permito compartilhar meu email, caso surja outros compradores."
              disabled={isSubmitting}
              slotProps={{
                typography: {
                  fontSize: '14px',
                },
              }}
            />
            {!!errors.shareEmail && <FormHelperText>{errors.shareEmail?.message}</FormHelperText>}
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            startIcon={isSubmitting && <CircularProgress size={20} />}
            disabled={isSubmitting}
            sx={{
              '&&': {
                marginTop: 2,
              },
            }}
          >
            {isSubmitting ? 'Verificando...' : 'Verificar'}
          </Button>
        </Stack>
      </DialogContent>
    </>
  )
}

export type ResultDialogProps = {
  contactEmail: string
} & TicketResult

export const ResultDialogContent = (props: ResultDialogProps) => {
  const { contactEmail, contactEmails, matches } = props
  const { hideAll } = useGlobalDialog()

  return (
    <>
      <DialogTitle component="h2" variant="h3" fontWeight="bold">
        Resultado
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          {matches === 'owner' && (
            <>
              {contactEmails.length === 1 && (
                <>
                  Por enquanto, ninguém cadastrou seu ingresso. Não precisa retornar aqui novamente,
                  te enviaremos um email caso alguém o cadastre, mas esperamos que não 🙏🏻.
                </>
              )}
              {contactEmails.length === 2 && (
                <>
                  Infelizmente outra pessoa já cadastrou seu ingresso. Caso você queira entrar em
                  contato com o outro comprador, seu email é{' '}
                  <a href={`mailto:${filterEmail(contactEmail, contactEmails)[0]}`}>
                    {filterEmail(contactEmail, contactEmails)[0]}
                  </a>
                  .
                </>
              )}
              {contactEmails.length > 2 && (
                <>
                  Infelizmente outras pessoas já cadastraram seu ingresso. Caso você queira entrar
                  em contato com os outros compradores, seus emails são{' '}
                  {filterEmail(contactEmail, contactEmails).map((email, index) => (
                    <Fragment key={email}>
                      <a href={`mailto:${email}`}>{email}</a>
                      {index < contactEmails.length - 1 && ', '}
                    </Fragment>
                  ))}
                  .
                </>
              )}
            </>
          )}
          {matches === true && (
            <>
              {contactEmails.length === 1 && (
                <>
                  Infelizmente seu ingresso já foi cadastrado por outra pessoa. Caso você queira
                  entrar em contato com o outro comprador, seu email é{' '}
                  <a href={`mailto:${contactEmails[0]}`}>{contactEmails[0]}</a>.
                </>
              )}
              {contactEmails.length > 1 && (
                <>
                  Infelizmente seu ingresso já foi cadastrado por outras pessoas. Caso você queira
                  entrar em contato com os outros compradores, seus emails são{' '}
                  {contactEmails.map((email, index) => (
                    <Fragment key={email}>
                      <a href={`mailto:${email}`}>{email}</a>
                      {index < contactEmails.length - 1 && ', '}
                    </Fragment>
                  ))}
                  .
                </>
              )}
            </>
          )}
          {matches === false && (
            <>
              Oba! Seu ingresso ainda não foi cadastrado por ninguém. Te enviaremos um email caso
              alguém o cadastre, mas esperamos que não 🙏🏻.
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={hideAll}>Entendi</Button>
      </DialogActions>
    </>
  )
}

const filterEmail = (email: string, emails: string[]) => {
  return emails.filter(e => e !== email)
}
