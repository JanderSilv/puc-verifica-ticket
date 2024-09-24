import { z } from 'zod'

const homeValidationMessages = {
  platformId: 'Selecione uma plataforma',
}

export const homeValidationSchema = z.object({
  platformId: z.number({
    required_error: homeValidationMessages.platformId,
  }),
})

export type HomeValues = z.infer<typeof homeValidationSchema>

const ticketVerificationValidationMessages = {
  identifier: 'Informe o identificador',
  email: 'Informe o email de contato',
}

export const makeTicketVerificationValidationSchema = () =>
  z.object({
    identifier: z
      .string({
        required_error: ticketVerificationValidationMessages.identifier,
      })
      .min(1, ticketVerificationValidationMessages.identifier),
    email: z
      .string({
        required_error: ticketVerificationValidationMessages.email,
      })
      .min(1, ticketVerificationValidationMessages.email)
      .email('Informe um email válido'),
    shareEmail: z.literal<boolean>(true, {
      errorMap: () => ({ message: 'Obrigatório' }),
    }),
  })

export type TicketVerificationValues = z.infer<
  ReturnType<typeof makeTicketVerificationValidationSchema>
>
