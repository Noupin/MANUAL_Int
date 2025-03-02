import type { Prisma, Review } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ReviewCreateArgs>({
  review: {
    one: { data: { rating: 376978, comment: 'String' } },
    two: { data: { rating: 7017313, comment: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Review, 'review'>
