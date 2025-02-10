import { z } from 'zod'

const EnvSchema = z
  .object({
    LOG_LEVEL: z.enum(['dev', 'staging', 'prod']),
    DATAABASE_URL: z.string().url(),
  })

export type env = z.infer<typeof EnvSchema>

const { data: parsedEnv, error } = EnvSchema.safeParse(process.env)
if (error) {
  console.error('❌ Invalid env:')
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2))
  process.exit(1)
}

export default parsedEnv!
