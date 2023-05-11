import { useState } from 'react'
import { Place } from '../utils/types'
import { Link } from 'react-router-dom'
import { FlagIcon, StarIcon } from '@heroicons/react/24/solid'
import { Card, CardBody, Rating, Typography } from '@material-tailwind/react'
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
            <Link to={`/places/${place.id}`} className='line-clamp-2'>
              {place.name}
            </Link>
          </Typography>
          <div className='flex w-full items-center gap-2'>
            <button className='flex h-16 w-16 items-center justify-center rounded-lg border border-gray-800 p-1  font-semibold'>
              <FlagIcon className='h-8 w-8 '></FlagIcon>
            </button>
            <button className='flex h-16 w-16 items-center justify-center rounded-lg border border-gray-800 p-1  font-semibold'>
              <StarIcon className='h-8 w-8 '></StarIcon>
            </button>
            <div className=''>
              <Typography color='blue-gray' className='font-medium'>
                {`Your rating: `}
              </Typography>
              <Rating value={rated} onChange={(value) => setRated(value)} />
            </div>
          </div>

          <Typography>
            <span className='line-clamp-4'>
              {place.description}
              {` Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae atque earum, ea eligendi accusamus porro omnis fugit repellendus! Laboriosam quisquam voluptatem quae eius neque ut odit nemo cumque voluptatum alias.`}
            </span>
          </Typography>
        </div>
      </CardBody>
    </Card>
  )
}

export default PlaceTemplate