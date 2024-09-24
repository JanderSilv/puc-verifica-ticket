'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Platform } from '@/models/types'

import { useGlobalDialog } from '@/contexts'
import { revalidateTag } from '@/helpers'
import { eventsService } from '@/services'

import { Calendar } from '@/components/shared'

type RegisterEventInput = z.infer<typeof registerEventValidationSchema>

type RegisterEventDialogContentProps = {
  dialogId: string
  platforms: Platform[]
  refreshEvents: () => void
}

export const RegisterEventDialogContent = (props: RegisterEventDialogContentProps) => {
  const { dialogId, platforms, refreshEvents } = props

  const { hide } = useGlobalDialog()
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<RegisterEventInput>({
    resolver: zodResolver(registerEventValidationSchema),
  })

  const onSubmit = async (data: RegisterEventInput) => {
    const { error } = await eventsService.create(data)

    if (error) return

    revalidateTag('events')
    refreshEvents()
    hide(dialogId)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <Typography component="h2" variant="h3" marginBottom={2}>
          Cadastrar evento
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Nome"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />
          <TextField
            label="Imagem (url)"
            {...register('image')}
            error={!!errors.image}
            helperText={errors.image?.message}
            fullWidth
          />
          <TextField
            label="Plataforma"
            defaultValue=""
            {...register('platformId')}
            error={!!errors.platformId}
            helperText={errors.platformId?.message}
            fullWidth
            select
          >
            {platforms.map(platform => (
              <MenuItem key={platform.id} value={platform.id}>
                {platform.name}
              </MenuItem>
            ))}
          </TextField>
          <Controller
            name="dates"
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <Calendar
                label="Datas"
                onChange={newValue => {
                  Array.isArray(newValue) && onChange(newValue.map(date => date.toDate()))
                }}
                error={!!errors.dates?.[0]}
                helperText={errors.dates?.[0]?.message}
                multiple
                {...field}
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => hide(dialogId)}>Cancelar</Button>
        <Button type="submit">Cadastrar</Button>
      </DialogActions>
    </Box>
  )
}

const registerEventValidationSchema = z.object({
  name: z.string().min(1, 'O título é obrigatório'),
  image: z.string().url('A imagem deve ser uma URL válida'),
  platformId: z.number({ required_error: 'A plataforma é obrigatória' }),
  dates: z
    .array(z.date(), { required_error: 'É necessário pelo menos uma data' })
    .min(1, 'É necessário pelo menos uma data'),
})
