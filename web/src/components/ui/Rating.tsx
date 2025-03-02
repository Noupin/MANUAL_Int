import React, { useState } from 'react'

interface RatingProps {
  rating?: number
  setRating?: React.Dispatch<React.SetStateAction<number>>
}

export const Rating: React.FC<RatingProps> = (props) => {
  const { rating, setRating } = props
  const [hoveredRating, setHoveredRating] = useState(0)

  return (
    <div className="bg-manualLighterBlue my-4 flex rounded-md">
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          onClick={() => setRating(num)}
          onMouseEnter={() => setHoveredRating(num)}
          onMouseLeave={() => setHoveredRating(0)}
          className={`px-4 py-2 transition-colors hover:rounded-r-md
                  ${num === 1 ? 'rounded-l-md' : ''}
                  ${num === 5 ? 'rounded-r-md' : ''}
                  ${num === rating ? 'bg-manualBlue text-white transition-[border-radius] duration-500' : ''}
                  ${num <= hoveredRating && num !== rating ? 'bg-manualLightBlue' : ''}
                  `}
        >
          {num}
        </button>
      ))}
    </div>
  )
}
