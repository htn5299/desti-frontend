import { Place } from '../utils/types'
import { Card, CardBody, CardFooter, Typography, Avatar, IconButton } from '@material-tailwind/react'
import { ChatBubbleBottomCenterIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/solid'
import PlaceTemplate from './PlaceTemplate'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Moment from 'react-moment'
interface PostItemProps {
  place: Place
}
function PostItem(props: PostItemProps) {
  const { place } = props
  const [isFavorite, setIsFavorite] = useState(false)
  // const handleOpen = () => setOpen((cur) => !cur)
  const handleIsFavorite = () => setIsFavorite((cur) => !cur)
  return (
    <Card className='mt-6 w-5/6 border border-gray-300 md:w-3/5 lg:w-[555px]'>
      <CardBody className='flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
          <div className='flex  items-center gap-2'>
            <Avatar
              src='https://images.unsplash.com/photo-1682917265580-b2a516f730d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=684&q=80'
              size='sm'
              className='cursor-pointer'
            ></Avatar>
            <Typography variant='h6'>
              <Link to={`users/${place.createdBy?.id}`} className='font-semibold text-gray-900'>
                {place.createdBy?.name}
              </Link>
            </Typography>
          </div>
          <Typography variant='small'>
            <span>
              <Moment fromNow>{place.updatedAt}</Moment>
            </span>
          </Typography>
        </div>
        <div>
          <Typography variant='paragraph'>{place.name}</Typography>
          <Typography variant='paragraph'>{place.description}</Typography>
        </div>
        <PlaceTemplate place={place}></PlaceTemplate>
      </CardBody>
      <CardFooter className='border-t-2'>
        <div className='flex items-end gap-6'>
          <div className='flex items-center gap-1 '>
            <IconButton variant='text' size='sm' color={isFavorite ? 'red' : 'blue-gray'} onClick={handleIsFavorite}>
              <HeartIcon className='h-5 w-5' />
            </IconButton>
            <p>69</p>
          </div>
          <div className='flex items-center gap-1'>
            <IconButton variant='text' size='sm' color={'blue-gray'}>
              <ChatBubbleBottomCenterIcon className='h-5 w-5'></ChatBubbleBottomCenterIcon>
            </IconButton>
            <p>12</p>
          </div>
          <IconButton variant='text' size='sm' color={'blue-gray'}>
            <ShareIcon className='h-[24px] w-[24px] cursor-pointer'></ShareIcon>
          </IconButton>
        </div>
      </CardFooter>
    </Card>
  )
}

export default PostItem
