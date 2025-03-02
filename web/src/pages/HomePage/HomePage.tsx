import { useEffect, useState } from 'react'

import { Metadata, useMutation } from '@redwoodjs/web'

import { Rating } from 'src/components/ui/Rating'
import {
  autoGrowTextArea,
  MIN_TEXT_AREA_HEIGHT,
  TOTAL_TEXT_AREA_NON_TEXT_HEIGHT,
} from 'src/utils'

const HomePage = () => {
  const [anon, setAnon] = useState(false)
  const [rating, setRating] = useState(0)
  const [textAreaHeight, setTextAreaHeight] = useState(
    MIN_TEXT_AREA_HEIGHT + TOTAL_TEXT_AREA_NON_TEXT_HEIGHT
  )
  const [feedback, setFeedback] = useState('')

  // const [createReview] = useMutation(CREATE_REVIEW_MUTATION)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLTextAreaElement) return
      const key = parseInt(event.key)
      if (key >= 1 && key <= 5) {
        setRating(key)
      }
      if (key < 1) {
        setRating(1)
      }

      if (key > 5) {
        setRating(5)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    const messageWithoutLeadingNewlines = feedback.replace(/^\n+/, '')
    if (messageWithoutLeadingNewlines === '') {
      setFeedback(messageWithoutLeadingNewlines)
      setTextAreaHeight(MIN_TEXT_AREA_HEIGHT + TOTAL_TEXT_AREA_NON_TEXT_HEIGHT)
    }
  }, [feedback])

  // function submitFeedback() {
  //   console.log('Feedback:', feedback)
  //   createReview({
  //     variables: {
  //       input: {
  //         rating: rating,
  //         feedback: feedback,
  //         anonymous: anon,
  //       },
  //     },
  //   })
  // }

  return (
    <>
      <Metadata title="Home" description="Home page" />
      <body className="min-w-screen max-w-screen flex max-h-screen min-h-screen flex-col">
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
                autoGrowTextArea(e, setTextAreaHeight)
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
              <button className="rounded-lg border-2 border-manualBlue px-2 py-1 transition-colors hover:bg-manualBlue hover:text-white">
                Submit
              </button>
            </div>
          </section>
        </main>
      </body>
    </>
  )
}

export default HomePage
