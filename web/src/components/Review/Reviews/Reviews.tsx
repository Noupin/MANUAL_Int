import type {
  DeleteReviewMutation,
  DeleteReviewMutationVariables,
  FindReviews,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Review/ReviewsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_REVIEW_MUTATION: TypedDocumentNode<
  DeleteReviewMutation,
  DeleteReviewMutationVariables
> = gql`
  mutation DeleteReviewMutation($id: Int!) {
    deleteReview(id: $id) {
      id
    }
  }
`

const ReviewsList = ({ reviews }: FindReviews) => {
  const [deleteReview] = useMutation(DELETE_REVIEW_MUTATION, {
    onCompleted: () => {
      toast.success('Review deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteReviewMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete review ' + id + '?')) {
      deleteReview({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>User id</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{truncate(review.id)}</td>
              <td>{truncate(review.rating)}</td>
              <td>{truncate(review.comment)}</td>
              <td>{truncate(review.userId)}</td>
              <td>{timeTag(review.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.review({ id: review.id })}
                    title={'Show review ' + review.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editReview({ id: review.id })}
                    title={'Edit review ' + review.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete review ' + review.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(review.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReviewsList
