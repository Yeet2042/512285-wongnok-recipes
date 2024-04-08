import { StarIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'

type Props = {
  rating: number | null
  editable?: boolean
  onRatingChange?: (rating: number) => void
}

export default function RatingStars({ rating, editable = true, onRatingChange }: Props) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleStarClick = (value: number) => {
    if (editable && onRatingChange) {
      onRatingChange(value);
    }
  }

  const handleStarHover = (value: number) => {
    if (editable) {
      setHoverRating(value)
    }
  }

  const handleStarLeave = () => {
    if (editable) {
      setHoverRating(null)
    }
  }

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon 
          key={star}
          className={
            (star <= (hoverRating || rating || 0) ? 'text-yellow-500' : 'text-gray-400') +
            ' h-5 w-5 cursor-pointer'
          }
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleStarHover(star)}
          onMouseLeave={handleStarLeave}
        />
      ))}
    </div>
  )
}