import type {
  DeleteReviewMutation,
  DeleteReviewMutationVariables,
  FindReviewById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

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

interface Props {
  review: NonNullable<FindReviewById['review']>
}

const Review = ({ review }: Props) => {
  const [deleteReview] = useMutation(DELETE_REVIEW_MUTATION, {
    onCompleted: () => {
      toast.success('Review deleted')
      navigate(routes.reviews())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteReviewMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete review ' + id + '?')) {
      deleteReview({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Review {review.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{review.id}</td>
            </tr>
            <tr>
              <th>Rating</th>
              <td>{review.rating}</td>
            </tr>
            <tr>
              <th>Comment</th>
              <td>{review.comment}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{review.userId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(review.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editReview({ id: review.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(review.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Review
