export const schema = gql`
  type Review {
    id: Int!
    rating: Int!
    comment: String!
    user: User!
    userId: Int!
    createdAt: DateTime!
  }

  type Query {
    reviews: [Review!]! @skipAuth
    review(id: Int!): Review @skipAuth
  }

  input CreateReviewInput {
    rating: Int!
    comment: String!
    userId: Int!
  }

  input UpdateReviewInput {
    rating: Int
    comment: String
    userId: Int
  }

  type Mutation {
    createReview(input: CreateReviewInput!): Review! @skipAuth
    updateReview(id: Int!, input: UpdateReviewInput!): Review! @requireAuth
    deleteReview(id: Int!): Review! @requireAuth
  }
`
