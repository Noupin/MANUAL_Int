import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: { name: 'String3545774', hashedPassword: 'String', salt: 'String' },
    },
    two: {
      data: { name: 'String1390206', hashedPassword: 'String', salt: 'String' },
    },
  },
  coaches: {
    one: {
      data: {
        name: 'String3545774',
        hashedPassword: 'String',
        salt: 'String',
        coach: true,
      },
    },
    two: {
      data: {
        name: 'String1390206',
        hashedPassword: 'String',
        salt: 'String',
        coach: true,
      },
    },
    three: {
      data: {
        name: 'String1390206',
        hashedPassword: 'String',
        salt: 'String',
        coach: false,
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
