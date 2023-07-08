import React, { Fragment } from 'react'
import { PostItem } from './index'
import { useGetReviewsByUserIdQuery } from '../../redux/api/reviewApi'
import { RootState, useAppSelector } from '../../redux/store'
import { useParams } from 'react-router-dom'

const PostListUser = () => {
  const { userId } = useParams<{ userId: string }>()
  const { data: reviews } = useGetReviewsByUserIdQuery(String(userId), { skip: !userId })
  const postList = reviews?.map((review, i) => {
    return (
      <Fragment key={review.id}>
        <PostItem review={review} />
      </Fragment>
    )
  })
  return <div>{postList}</div>
}

export default PostListUser
