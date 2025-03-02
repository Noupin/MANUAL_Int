import type { EditReviewById, UpdateReviewInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms'

type FormReview = NonNullable<EditReviewById['review']>

interface ReviewFormProps {
  review?: EditReviewById['review']
  onSave: (data: UpdateReviewInput, id?: FormReview['id']) => void
  error: RWGqlError
  loading: boolean
}

const ReviewForm = (props: ReviewFormProps) => {
  const onSubmit = (data: FormReview) => {
    props.onSave(data, props?.review?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormReview> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="rating"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rating
        </Label>

        <NumberField
          name="rating"
          defaultValue={props.review?.rating}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="rating" className="rw-field-error" />

        <Label
          name="comment"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Comment
        </Label>

        <TextField
          name="comment"
          defaultValue={props.review?.comment}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="comment" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          defaultValue={props.review?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="userId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ReviewForm
