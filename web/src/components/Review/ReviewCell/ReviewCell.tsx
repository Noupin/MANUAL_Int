import type { FindReviewById, FindReviewByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Review from 'src/components/Review/Review'

export const QUERY: TypedDocumentNode<FindReviewById, FindReviewByIdVariables> =
  gql`
    query FindReviewById($id: Int!) {
      review: review(id: $id) {
        id
        rating
        comment
        userId
        createdAt
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Review not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindReviewByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  review,
}: CellSuccessProps<FindReviewById, FindReviewByIdVariables>) => {
  return <Review review={review} />
}
