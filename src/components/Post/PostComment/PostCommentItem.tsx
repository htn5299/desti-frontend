import React from 'react'
import { CommentResponse } from '../../../utils/types'
import { Avatar } from '@material-tailwind/react'
import EmptyAvatar from '../../../assets/profile/avatar.png'
import Moment from 'react-moment'

interface PropsState {
  comment: CommentResponse
}

const PostCommentItem = (propsState: PropsState) => {
  const { comment } = propsState
  const { profile } = comment.user
  const { avatar } = profile
  const { comment: commentData, createdAt } = comment
  return (
    <div className={'flex items-center gap-2'}>
      <div>
        <Avatar size={'xs'} src={avatar ? `${process.env.REACT_APP_AWS_URL}${avatar}` : EmptyAvatar} />
      </div>
      <div>
        <span className={'text-sm'}>{commentData}</span>
        <Moment className={'block text-xs text-gray-500'} toNow>
          {createdAt}
        </Moment>
      </div>
    </div>
  )
}

export default PostCommentItem
