import { ReviewFeedResponse } from '../../utils/types'
import { Avatar, Typography } from '@material-tailwind/react'
import Moment from 'react-moment'
import AvatarImage from './../../assets/logos/avatar.png'
import { useGetPlaceQuery } from '../../redux/api/placesApi'
import React from 'react'
import PlaceTemplate from 'components/Place/PlaceTemplate'
interface PostItemProps {
  review: ReviewFeedResponse
}

function PostItem(props: PostItemProps) {
  const { review } = props
  const { data: place } = useGetPlaceQuery(`${review.place.id}`)
  return (
    <div className={'m-w-[556px] mx-auto mb-2 rounded bg-gray-100'}>
      <div className={'p-3'}>
        <div className={'mb-3 flex items-center gap-2'}>
          <Avatar src={review.user.profile.avatar || AvatarImage} alt={'test13'} />
          <div className={'flex flex-col gap-0'}>
            <Typography className={'text-lg font-normal'}>{review.user.name}</Typography>
            <Moment className={'text-xs leading-none text-gray-500'} toNow>
              {review.updatedAt}
            </Moment>
          </div>
        </div>
        <div>
          <Typography className={'mb-2 text-lg font-light'}>{review.review}</Typography>
          <div className={'w-[320px]'}>{place && <PlaceTemplate place={place} />}</div>
        </div>
      </div>
      {/*todo: sidebar like and comment*/}
      <div></div>
    </div>
  )
}

export default PostItem
