import { z } from 'zod'

const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
})
const clientSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().min(1),
})

const processEnvSchema = serverSchema.merge(clientSchema)

const processEnv = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NODE_ENV: process.env.NODE_ENV,
}

if (!!process.env.SKIP_ENV_VALIDATION == false) {
  const isServer = typeof window === 'undefined'

  const parsed = isServer
    ? processEnvSchema.safeParse(processEnv)
    : clientSchema.safeParse(processEnv)

  if (parsed.success === false) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)
    throw new Error('Invalid environment variables')
  }
}

export const ENV = processEnv
