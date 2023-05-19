import { Place } from '../../utils/types'
import { Link } from 'react-router-dom'
import { FlagIcon, HeartIcon } from '@heroicons/react/24/solid'
import { Card, CardBody, CardFooter, IconButton, Rating, Typography } from '@material-tailwind/react'
import { useState } from 'react'
interface PostItemProps {
  place: Place
}
function PlaceTemplate({ place }: PostItemProps) {
  const [rated, setRated] = useState(0)
  return (
    <Card className='mx-auto h-64 w-full border-y border-r drop-shadow-sm'>
      <CardBody className='flex h-full gap-3 p-0'>
        <div className='h-full w-44 overflow-hidden rounded-l-xl '>
          <img
            src='https://images.unsplash.com/photo-1659521996814-5436db7916eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=907&q=80'
            alt='img-blur-shadow'
            className='h-full w-full object-cover'
          />
        </div>
        <div className='flex w-5/6 flex-col gap-2 py-2 '>
          <Typography variant='h6' color='blue-gray' className=''>
            <Link to={`/places/${place.id}`} className='line-clamp-2 hover:underline'>
              {place.name}
            </Link>
          </Typography>

          <Typography>
            <span className='line-clamp-4'>{place.description}</span>
          </Typography>
          <div className='flex w-full items-center gap-2'>
            <IconButton variant='outlined' size='lg' color='blue-gray'>
              <FlagIcon className='h-5 w-5' />
            </IconButton>
            <IconButton variant='outlined' size='lg' color='blue-gray'>
              <HeartIcon className='h-5 w-5' />
            </IconButton>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default PlaceTemplate
