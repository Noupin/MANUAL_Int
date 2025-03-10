import { useEffect, useState } from 'react'

import { CreateReviewInput } from 'types/graphql'

import { Metadata, useMutation, useQuery } from '@redwoodjs/web'

import { Rating } from 'src/components/ui/Rating'
import {
  autoGrowTextArea,
  CREATE_FULL_REVIEW_MUTATION,
  MIN_TEXT_AREA_HEIGHT,
  QUERY_COACHES,
  SUBMITTED_DURATION,
  TOTAL_TEXT_AREA_NON_TEXT_HEIGHT,
} from 'src/lib/utils'

const HomePage = () => {
  const [anon, setAnon] = useState(false)
  const [rating, setRating] = useState(0)
  const [textAreaHeight, setTextAreaHeight] = useState(
    MIN_TEXT_AREA_HEIGHT + TOTAL_TEXT_AREA_NON_TEXT_HEIGHT
  )
  const [feedback, setFeedback] = useState('')
  const [coachId, setCoachId] = useState(0)
  const [justSubmitted, setJustSubmitted] = useState(false)
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)

  const [createReview] = useMutation(CREATE_FULL_REVIEW_MUTATION)
  const { data } = useQuery(QUERY_COACHES)

  useEffect(() => {
    if (!data) return

    setCoachId(data.coaches[0].id)
  }, [data])

  useEffect(() => {
    const messageWithoutLeadingNewlines = feedback.replace(/^\n+/, '')
    if (messageWithoutLeadingNewlines === '') {
      setFeedback(messageWithoutLeadingNewlines)
      setTextAreaHeight(MIN_TEXT_AREA_HEIGHT + TOTAL_TEXT_AREA_NON_TEXT_HEIGHT)
    }
  }, [feedback])

  function submitFeedback() {
    console.log('Feedback:', feedback)
    const input: CreateReviewInput = {
      rating: rating,
      comment: feedback,
    }
    if (!anon) {
      input.userId = coachId
    }
    createReview({
      variables: {
        input,
      },
    })

    setJustSubmitted(true)
  }

  useEffect(() => {
    if (justSubmitted) {
      timerRef.current = setTimeout(() => {
        setJustSubmitted(false)
      }, SUBMITTED_DURATION)
      return () => {
        clearTimeout(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [justSubmitted])

  return (
    <>
      <Metadata title="Home" description="Home page" />
      <div className="min-w-screen max-w-screen flex max-h-screen min-h-screen flex-col">
        <header className="bg-manualBlue px-2 py-2">
          {/* <img src="/manual_logo.svg" alt="Manual Logo" className="grayscale" /> */}
          <h1 className="w-fit border-2 border-white px-1 text-xl font-extrabold text-white">
            <a href="https://www.manual.care/">MANUAL</a>
          </h1>
        </header>

        <main className="flex flex-1 items-center justify-center">
          <section className="flex flex-col items-center rounded-lg border-4 border-manualBlue p-5 text-center shadow-xl">
            <h2 className="mx-1 mb-1 font-bold">How did it go?</h2>
            <p className="">
              How was your conversation? Anything that could have gone better or
              <br></br>
              something that went amazing!?!
            </p>

            <Rating rating={rating} setRating={setRating} />

            <textarea
              className="max-h-96 min-h-16 w-full rounded border p-2"
              style={{ height: textAreaHeight }}
              value={feedback}
              onChange={(e) => {
                setFeedback(e.target.value)
                autoGrowTextArea(e.target, setTextAreaHeight)
              }}
              placeholder="Enter your feedback here..."
            />

            <div className="mt-4 flex w-full items-center justify-between">
              <div className="group relative flex">
                <input
                  type="checkbox"
                  checked={anon}
                  onChange={() => setAnon(!anon)}
                  className="mr-2"
                />
                <p>Anonymous boost</p>
                <span
                  className="absolute bottom-0 left-1/2 hidden w-max -translate-x-1/2 translate-y-full
                rounded-md bg-black bg-opacity-60 p-2 text-xs text-white backdrop-blur-md group-hover:block"
                >
                  You&apos;re feedback will be submitted to every coach instead
                  <br />
                  of one specific coach, which could narrow down you&apos;re
                  identity.
                </span>
              </div>
              <button
                onClick={submitFeedback}
                className={`rounded-lg border-2 px-2 py-1 transition-colors ${
                  justSubmitted
                    ? 'border-green-600 bg-green-600 text-white'
                    : 'border-manualBlue hover:bg-manualBlue hover:text-white'
                }`}
              >
                Submit
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default HomePage
