export const schema = gql`
  type User {
    id: Int!
    name: String!
    coach: Boolean!
    reviews: [Review]!
  }

  type Query {
    users: [User!]! @skipAuth
    user(id: Int!): User @skipAuth
    coaches: [User!]! @skipAuth
  }

  input CreateUserInput {
    name: String!
    coach: Boolean!
  }

  input UpdateUserInput {
    name: String
    coach: Boolean
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @skipAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
