import React from 'react'
import { useGetCommentsReviewOrUserQuery } from '../../../redux/api/commentApi'
import { PostCommentItem } from './index'

interface PropsState {
  reviewId: number
}

const PostCommentList = (props: PropsState) => {
  const { reviewId } = props
  const { data: comments } = useGetCommentsReviewOrUserQuery({ review: reviewId })
  const renderedComment =
    comments &&
    comments.map((comment) => (
      <div key={comment.id}>
        <PostCommentItem comment={comment} />
      </div>
    ))
  return (
    <div className={'max-h-52 overflow-y-auto'}>
      {comments && Boolean(comments.length) && <div className={'border-t border-gray-400 p-2'}>{renderedComment}</div>}
    </div>
  )
}

export default PostCommentList
