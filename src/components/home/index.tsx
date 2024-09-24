'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, MenuItem, Stack, TextField } from '@mui/material'

import { Platform } from '@/models/types'

import { useTicketContext } from '@/contexts'
import { eventsService } from '@/services'
import { HomeValues, homeValidationSchema } from './validations'

import { useHomeDialogs } from './hooks'

export type HomeFormProps = {
  platforms: Platform[]
}

export const HomeForm = (props: HomeFormProps) => {
  const { platforms } = props

  const { setData } = useTicketContext()
  const { showPlatformDialog } = useHomeDialogs()

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<HomeValues>({
    resolver: zodResolver(homeValidationSchema),
  })

  const platformOptions = platforms.map(platform => ({
    value: platform.id,
    label: platform.name,
  }))

  const onSubmit = async (data: HomeValues) => {
    const { platformId } = data

    setData(prevData => ({ ...prevData, platformId }))
    const [events, error] = await eventsService.getAllFromPlatform(platformId)

    if (error) return

    const platform = platforms.find(platform => platform.id === platformId)

    if (platform)
      showPlatformDialog({
        platform,
        events,
      })
  }

  return (
    <>
      <Stack
        component="form"
        direction={{ sm: 'row' }}
        spacing={2}
        rowGap={2}
        marginTop={4}
        minHeight={65}
        alignItems={{ sm: 'flex-start' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="Selecione a plataforma"
          defaultValue=""
          {...register('platformId')}
          helperText={errors.platformId?.message}
          error={!!errors.platformId?.message}
          size="small"
          sx={{ flex: 1 }}
          select
        >
          <MenuItem value="">Selecione a plataforma</MenuItem>
          {platformOptions.map(platform => (
            <MenuItem key={platform.value} value={platform.value}>
              {platform.label}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Continuar
        </Button>
      </Stack>
    </>
  )
}
