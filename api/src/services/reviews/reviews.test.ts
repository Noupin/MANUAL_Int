import type { Review } from '@prisma/client'

import {
  reviews,
  review,
  createReview,
  updateReview,
  deleteReview,
} from './reviews'
import type { StandardScenario } from './reviews.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('reviews', () => {
  scenario('returns all reviews', async (scenario: StandardScenario) => {
    const result = await reviews()

    expect(result.length).toEqual(Object.keys(scenario.review).length)
  })

  scenario('returns a single review', async (scenario: StandardScenario) => {
    const result = await review({ id: scenario.review.one.id })

    expect(result).toEqual(scenario.review.one)
  })

  scenario('creates a review', async (scenario: StandardScenario) => {
    const result = await createReview({
      input: {
        rating: 8576543,
        comment: 'String',
        userId: scenario.review.two.userId,
      },
    })

    expect(result.rating).toEqual(8576543)
    expect(result.comment).toEqual('String')
    expect(result.userId).toEqual(scenario.review.two.userId)
  })

  scenario('updates a review', async (scenario: StandardScenario) => {
    const original = (await review({ id: scenario.review.one.id })) as Review
    const result = await updateReview({
      id: original.id,
      input: { rating: 7927913 },
    })

    expect(result.rating).toEqual(7927913)
  })

  scenario('deletes a review', async (scenario: StandardScenario) => {
    const original = (await deleteReview({
      id: scenario.review.one.id,
    })) as Review
    const result = await review({ id: original.id })

    expect(result).toEqual(null)
  })
})
