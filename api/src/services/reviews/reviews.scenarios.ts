import type { Prisma, Review } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ReviewCreateArgs>({
  review: {
    one: {
      data: {
        rating: 3117581,
        comment: 'String',
        user: { create: { name: 'String1006376' } },
      },
    },
    two: {
      data: {
        rating: 6325615,
        comment: 'String',
        user: { create: { name: 'String3819134' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Review, 'review'>
