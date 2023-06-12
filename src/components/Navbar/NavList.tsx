import React from 'react'
import { FlagIcon, HeartIcon, HomeIcon } from '@heroicons/react/24/outline'
import { Typography } from '@material-tailwind/react'
import { Link } from 'react-router-dom'

const NavList = () => {
  return (
    <ul className='flex h-fit items-center gap-4'>
      <Typography as='li' variant='small' className={'   p-2 text-gray-50'}>
        <Link to='/' className={'flex items-start gap-2 text-lg uppercase'}>
          <HomeIcon className={'h-6 w-6'} />
          Home
        </Link>
      </Typography>
      <Typography as='li' variant='small' className={'   p-2 text-gray-50'}>
        <Link to='/' className={'flex items-start gap-2 text-lg uppercase'}>
          <FlagIcon className={'h-6 w-6'} />
          Been Here
        </Link>
      </Typography>
      <Typography as='li' variant='small' className={'   p-2 text-gray-50'}>
        <Link to='/' className={'flex items-start gap-2 text-lg uppercase'}>
          <HeartIcon className={'h-6 w-6'} />
          Want to go
        </Link>
      </Typography>
    </ul>
  )
}
export default NavList
