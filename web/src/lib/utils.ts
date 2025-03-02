import {
  CreateReviewMutation,
  CreateReviewMutationVariables,
  FindCoaches,
  FindUsersVariables,
} from 'types/graphql'

import { TypedDocumentNode } from '@redwoodjs/web'

export const MIN_TEXT_AREA_HEIGHT = 62
export const TOTAL_TEXT_AREA_NON_TEXT_HEIGHT = 16

export function autoGrowTextArea(
  element: HTMLTextAreaElement,
  setTextAreaHeight: React.Dispatch<React.SetStateAction<number>>
) {
  element.style.height = '0px'
  setTextAreaHeight(element.scrollHeight + TOTAL_TEXT_AREA_NON_TEXT_HEIGHT)
  console.log(
    'element.scrollHeight',
    element.scrollHeight + TOTAL_TEXT_AREA_NON_TEXT_HEIGHT
  )
  element.style.height = `${element.scrollHeight + TOTAL_TEXT_AREA_NON_TEXT_HEIGHT}px`
}

export const CREATE_FULL_REVIEW_MUTATION: TypedDocumentNode<
  CreateReviewMutation,
  CreateReviewMutationVariables
> = gql`
  mutation CreateReviewMutation($input: CreateReviewInput!) {
    createReview(input: $input) {
      comment
      rating
      userId
    }
  }
`

export const QUERY_COACHES: TypedDocumentNode<FindCoaches, FindUsersVariables> =
  gql`
    query FindCoaches {
      coaches {
        name
        coach
        id
      }
    }
  `
