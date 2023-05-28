import { Place } from '../../utils/types'
import { Link } from 'react-router-dom'
import { FlagIcon, HeartIcon } from '@heroicons/react/24/solid'
import { Card, CardBody, Typography } from '@material-tailwind/react'
import { useGetFavouriteQuery, useSetFavouriteMutation } from '../../redux/api/apiFavourite'
import classNames from 'classnames'
interface PostItemProps {
  place: Place
}
function PlaceTemplate({ place }: PostItemProps) {
  const { data: isFavourite, refetch: refreshFav } = useGetFavouriteQuery(place.id)
  const [addFavourite] = useSetFavouriteMutation()
  const handleHereClick = async () => {
    try {
      await addFavourite({ placeId: place.id, here: isFavourite && !isFavourite.here })
      refreshFav()
    } catch (e) {}
  }
  const handleWantClick = async () => {
    try {
      await addFavourite({ placeId: place.id, want: isFavourite && !isFavourite.want })
      refreshFav()
    } catch (e) {}
  }
  return (
    <Card className='mx-auto h-64 w-full border-y border-r drop-shadow-sm'>
      <CardBody className='relative flex h-full gap-3 p-0'>
        <div className='h-full w-44 overflow-hidden rounded-l-xl '>
          <img
            src='https://images.unsplash.com/photo-1659521996814-5436db7916eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=907&q=80'
            alt='img-blur-shadow'
            className='h-full w-full object-cover'
          />
        </div>
        <div className=' flex w-5/6 flex-col gap-2 py-2 '>
          <Typography variant='h6' color='blue-gray' className=''>
            <Link to={`/places/${place.id}`} className='line-clamp-2 hover:underline'>
              {place.name}
            </Link>
          </Typography>
          <div className='absolute bottom-3 flex w-full items-center gap-2'>
            <button
              className={classNames(
                'rounded-lg border-2 border-gray-400  p-3 text-gray-500  drop-shadow-xl duration-100 ease-in active:translate-y-px',
                {
                  'border-green-300 text-green-300': isFavourite?.here,
                  'hover:border-green-300 hover:text-green-300': !isFavourite?.here
                }
              )}
              onClick={() => handleHereClick()}
            >
              <FlagIcon className='h-5 w-5' />
            </button>
            <button
              className={classNames(
                'rounded-lg border-2 border-gray-400  p-3 text-gray-500  drop-shadow-xl duration-100 ease-in active:translate-y-px',
                {
                  'border-red-300 text-red-300': isFavourite?.want,
                  'hover:border-red-300 hover:text-red-300': !isFavourite?.want
                }
              )}
              onClick={() => handleWantClick()}
            >
              <HeartIcon className='h-5 w-5' />
            </button>
          </div>
          <Typography>
            <span className='line-clamp-4'>{place.description}</span>
          </Typography>
        </div>
      </CardBody>
    </Card>
  )
}

export default PlaceTemplate
