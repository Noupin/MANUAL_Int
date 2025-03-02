import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { email: 'String2263174' } },
    two: { data: { email: 'String643400' } },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
