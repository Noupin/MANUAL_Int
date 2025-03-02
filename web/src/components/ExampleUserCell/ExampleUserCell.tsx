import type {
  FindExampleUserQuery,
  FindExampleUserQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<
  FindExampleUserQuery,
  FindExampleUserQueryVariables
> = gql`
  query FindExampleUserQuery($id: Int!) {
    exampleUser: exampleUser(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindExampleUserQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  exampleUser,
}: CellSuccessProps<FindExampleUserQuery, FindExampleUserQueryVariables>) => {
  return <div>{JSON.stringify(exampleUser)}</div>
}
