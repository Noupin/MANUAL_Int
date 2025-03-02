export const schema = gql`
  type User {
    id: Int!
    email: String!
    name: String
    coach: Boolean!
    reviews: [Review]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    name: String
    coach: Boolean!
  }

  input UpdateUserInput {
    email: String
    name: String
    coach: Boolean
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
