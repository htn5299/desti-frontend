import moment from 'moment'
import { Place } from '../utils/types'
import { Card, CardBody, CardFooter, Typography, Avatar } from '@material-tailwind/react'
import { ChatBubbleBottomCenterIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline'
import PlaceTemplate from './PlaceTemplate'
interface PostItemProps {
  place: Place
}
function PostItem(props: PostItemProps) {
  const { place } = props
  const dateString = place.updatedAt
  const dateObj = new Date(dateString)
  const updatedAt = moment(dateObj).format('DD MMMM [at] hh:mm')
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
              <span className='cursor-pointer font-semibold text-gray-900'>{place.createdBy?.name}</span>
            </Typography>
          </div>
          <Typography variant='small'>
            <span>{updatedAt}</span>
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
            <HeartIcon className=' h-[24px] w-[24px] cursor-pointer text-red-500 '></HeartIcon>
            <p>69</p>
          </div>
          <div className='flex items-center gap-1'>
            <ChatBubbleBottomCenterIcon className='h-[24px] w-[24px] cursor-pointer '></ChatBubbleBottomCenterIcon>
            <p>12</p>
          </div>
          <ShareIcon className='h-[24px] w-[24px] cursor-pointer'></ShareIcon>
        </div>
      </CardFooter>
    </Card>
  )
}

export default PostItem
