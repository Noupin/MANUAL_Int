import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        name: 'String4407149',
        hashedPassword: 'String',
        salt: 'String',
        coach: false,
      },
    },
    two: {
      data: {
        name: 'String4314436',
        hashedPassword: 'String',
        salt: 'String',
        coach: true,
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
