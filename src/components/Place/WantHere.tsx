import React from 'react'
import { FlagIcon, HeartIcon } from '@heroicons/react/24/solid'
import { ResponseFavourite } from '../../utils/types'
import classNames from 'classnames'

interface PropsState {
  onHereClick: any
  onWantClick: any
  isFavourite?: ResponseFavourite
  hereUsers: number
  wantUsers: number
}

const WantHere = ({ onHereClick, onWantClick, isFavourite, wantUsers, hereUsers }: PropsState) => {
  return (
    <div className={'flex items-start gap-2'}>
      <div className={'flex flex-col items-center gap-2'}>
        <button
          className={classNames(
            'flex h-24 w-24  flex-col items-center justify-center  gap-1 rounded-xl border-2 border-gray-400 px-4  py-3 font-semibold uppercase text-gray-500 drop-shadow-xl duration-100 ease-in active:translate-y-px',
            {
              'border-green-400  bg-green-50 text-green-400': isFavourite?.here,
              'hover:border-green-400 hover:text-green-400': !isFavourite?.here
            }
          )}
          onClick={onHereClick}
        >
          <FlagIcon className={'font inline h-5 w-5 '} />
          <span className={'text-sm'}>Been Here </span>
        </button>
        <div
          className={classNames('text-3xl', {
            'text-green-500': isFavourite?.here,
            'text-gray-500': !isFavourite?.here
          })}
        >
          {hereUsers}
        </div>
      </div>

      <div className={'flex flex-col items-center gap-2'}>
        <button
          className={classNames(
            'flex h-24 w-24 flex-col items-center justify-center  gap-1 rounded-xl border-2 border-gray-400 px-4  py-3 font-semibold uppercase text-gray-500 drop-shadow-xl duration-100 ease-in active:translate-y-px',
            {
              'border-red-400 bg-red-50 text-red-400': isFavourite?.want,
              'hover:border-red-400 hover:text-red-400': !isFavourite?.want
            }
          )}
          onClick={onWantClick}
        >
          <HeartIcon className={'font inline h-5 w-5 '} />
          <span className={'text-sm'}>Want to visit </span>
        </button>
        <div
          className={classNames('text-3xl', {
            'text-red-500': isFavourite?.want,
            'text-gray-500': !isFavourite?.want
          })}
        >
          {wantUsers}
        </div>
      </div>
    </div>
  )
}

export default WantHere
