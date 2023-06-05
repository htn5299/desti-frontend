import React from 'react'
import { Button } from '@material-tailwind/react'
import { FlagIcon, HeartIcon } from '@heroicons/react/24/solid'
import { ResponseFavourite } from '../../utils/types'
import classNames from 'classnames'
interface PropsState {
  onHereClick: any
  onWantClick: any
  isFavourite?: ResponseFavourite
}
const WantHere = ({ onHereClick, onWantClick, isFavourite }: PropsState) => {
  return (
    <div className={'flex h-14 items-center gap-2'}>
      <button
        className={classNames(
          'flex w-48 items-center justify-center  gap-1 rounded-xl border-2 border-gray-400 px-4  py-3 font-semibold uppercase text-gray-500 drop-shadow-xl duration-100 ease-in active:translate-y-px',
          {
            'border-green-400  bg-green-50 text-green-400': isFavourite?.here,
            'hover:border-green-400 hover:text-green-400': !isFavourite?.here
          }
        )}
        onClick={onHereClick}
      >
        <span>Been Here </span>
        <FlagIcon className={'font inline h-5 w-5 '} />
      </button>
      <button
        className={classNames(
          'flex w-48 items-center justify-center  gap-1 rounded-xl border-2 border-gray-400 px-4  py-3 font-semibold uppercase text-gray-500 drop-shadow-xl duration-100 ease-in active:translate-y-px',
          {
            'border-red-400 bg-red-50 text-red-400': isFavourite?.want,
            'hover:border-red-400 hover:text-red-400': !isFavourite?.want
          }
        )}
        onClick={onWantClick}
      >
        <span>Want Here </span>
        <HeartIcon className={'font inline h-5 w-5 '} />
      </button>
    </div>
  )
}

export default WantHere
