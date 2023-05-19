import React from 'react'
import { Button } from '@material-tailwind/react'
import { FlagIcon, HeartIcon } from '@heroicons/react/24/outline'

const WantHere = () => {
  return (
    <div className={'flex items-center gap-2'}>
      <Button variant={'outlined'} color={'blue-gray'} className={'w-48'}>
        <span>Been Here </span>
        <FlagIcon className={'inline h-5 w-5'}></FlagIcon>
      </Button>
      <Button variant={'outlined'} color={'blue-gray'} className={'w-48'}>
        <span>Want to Go </span>
        <HeartIcon className={'inline h-5 w-5'}></HeartIcon>
      </Button>
    </div>
  )
}

export default WantHere
