import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    AZURE_SUBSCRIPTION_KEY: z.string().min(1),
    AZURE_SERVICE_REGION: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_BASE_URL: z.string().url(),
  },
  runtimeEnv: {
    AZURE_SUBSCRIPTION_KEY: process.env.AZURE_SUBSCRIPTION_KEY,
    AZURE_SERVICE_REGION: process.env.AZURE_SERVICE_REGION,
    NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
  },
})
