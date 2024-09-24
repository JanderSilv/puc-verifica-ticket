'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { PlatformInput } from '@/models/types'

import { useGlobalDialog } from '@/contexts'
import { platformsService } from '@/services'

type RegisterPlatformDialogContentProps = {
  dialogId: string
  refreshPlatforms: () => void
}

export const RegisterPlatformDialogContent = (props: RegisterPlatformDialogContentProps) => {
  const { dialogId, refreshPlatforms } = props

  const { hide } = useGlobalDialog()
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<PlatformInput>({
    resolver: zodResolver(registerPlatformValidationSchema),
  })

  const onSubmit = async (data: PlatformInput) => {
    try {
      await platformsService.create(data)
      refreshPlatforms()
      hide(dialogId)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <Typography component="h2" variant="h3" marginBottom={2}>
          Cadastrar plataforma
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Nome"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={isSubmitting}
            fullWidth
          />
          <TextField
            label="Imagem (url)"
            {...register('image')}
            error={!!errors.image}
            helperText={errors.image?.message}
            disabled={isSubmitting}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => hide(dialogId)} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Cadastrar
        </Button>
      </DialogActions>
    </Box>
  )
}
const registerPlatformValidationSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  image: z.string().url('A imagem deve ser uma URL válida'),
})
