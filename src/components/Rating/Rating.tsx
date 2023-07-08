import React from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'

interface PropState {
  rating: number
}

const Rating = ({ rating }: PropState) => {
  return (
    <div className={'flex'}>
      <StarIcon
        className={classNames('h-5 w-5 ', { 'text-yellow-700': 1 <= rating, 'text-gray-400': !(1 <= rating) })}
      />
      <StarIcon
        className={classNames('h-5 w-5 ', { 'text-yellow-700': 2 <= rating, 'text-gray-400': !(2 <= rating) })}
      />
      <StarIcon
        className={classNames('h-5 w-5 ', { 'text-yellow-700': 3 <= rating, 'text-gray-400': !(3 <= rating) })}
      />
      <StarIcon
        className={classNames('h-5 w-5 ', { 'text-yellow-700': 4 <= rating, 'text-gray-400': !(4 <= rating) })}
      />
      <StarIcon
        className={classNames('h-5 w-5 ', { 'text-yellow-700': 5 <= rating, 'text-gray-400': !(5 <= rating) })}
      />
    </div>
  )
}

export default Rating
