import type { FindReviews, FindReviewsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Reviews from 'src/components/Review/Reviews'

export const QUERY: TypedDocumentNode<FindReviews, FindReviewsVariables> = gql`
  query FindReviews {
    reviews {
      id
      rating
      comment
      userId
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No reviews yet.{' '}
      <Link to={routes.newReview()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindReviews>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  reviews,
}: CellSuccessProps<FindReviews, FindReviewsVariables>) => {
  return <Reviews reviews={reviews} />
}
