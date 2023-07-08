import React, { Fragment } from 'react'
import { PostItem } from './index'
import { useGetReviewsByUserIdQuery } from '../../redux/api/reviewApi'
import { useParams } from 'react-router-dom'

const PostListUser = () => {
  const { userId } = useParams<{ userId: string }>()
  const { data: reviews } = useGetReviewsByUserIdQuery(String(userId), { skip: !userId })
  const postList = reviews?.map((review) => {
    return (
      <Fragment key={review.id}>
        <PostItem review={review} />
      </Fragment>
    )
  })
  return <div>{postList}</div>
}

export default PostListUser
