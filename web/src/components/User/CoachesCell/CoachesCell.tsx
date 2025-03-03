import type { FindCoaches, FindUsersVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Users from '../Users'

export const QUERY: TypedDocumentNode<FindCoaches, FindUsersVariables> = gql`
  query CoachesQuery {
    coaches {
      name
      coach
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps<FindUsersVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  coaches,
}: CellSuccessProps<FindCoaches, FindUsersVariables>) => {
  return <Users users={coaches} />
}
