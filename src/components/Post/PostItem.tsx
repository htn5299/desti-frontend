import { Card, CardBody, CardFooter, Typography, Avatar, IconButton } from '@material-tailwind/react'
import { ChatBubbleBottomCenterIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/solid'
import Moment from 'react-moment'
import PlaceTemplate from '../Place/PlaceTemplate'
import { useState } from 'react'
import { ReviewFeedRespone } from '../../utils/types'
import { Link } from 'react-router-dom'

import EmptyAvatar from '../../assets/logos/avatar.png'

interface PostItemProps {
  review: ReviewFeedRespone
}
function PostItem(props: PostItemProps) {
  const { review } = props
  const [isFavorite, setIsFavorite] = useState(false)
  const handleIsFavorite = () => setIsFavorite((cur) => !cur)
  return (
    <Card className='mt-6 w-5/6 border border-gray-300 md:w-3/5 lg:w-[555px]'>
      <CardBody className='flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
          <div className='flex  items-center gap-2'>
            <Avatar src={review.user.profile.avatar || EmptyAvatar} size='sm' className='cursor-pointer'></Avatar>
            <Typography variant='h6'>
              <Link to={`users/${review.user.id}`} className='font-semibold text-gray-900'>
                {review.user.name}
              </Link>
            </Typography>
          </div>
          <Typography variant='small'>
            <span>
              <Moment fromNow>{review.updatedAt}</Moment>
            </span>
          </Typography>
        </div>
        <div>
          <Typography variant='paragraph'>{review.review}</Typography>
        </div>
        <PlaceTemplate place={review.place} />
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
