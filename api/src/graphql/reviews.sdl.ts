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
    reviews: [Review!]! @requireAuth
    review(id: Int!): Review @requireAuth
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
    createReview(input: CreateReviewInput!): Review! @requireAuth
    updateReview(id: Int!, input: UpdateReviewInput!): Review! @requireAuth
    deleteReview(id: Int!): Review! @requireAuth
  }
`
