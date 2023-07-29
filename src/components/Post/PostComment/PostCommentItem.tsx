import React from 'react'
import { CommentResponse } from '../../../utils/types'
import { Avatar } from '@material-tailwind/react'
import EmptyAvatar from '../../../assets/profile/avatar.png'
import Moment from 'react-moment'
import { useDeleteCommentMutation } from '../../../redux/api/commentApi'
import { RootState, useAppSelector } from '../../../redux/store'
import { TrashIcon } from '@heroicons/react/24/outline'

interface PropsState {
  comment: CommentResponse
}

const PostCommentItem = (propsState: PropsState) => {
  const userId = useAppSelector((state: RootState) => state.user.id)
  const { comment } = propsState
  const { profile } = comment.user
  const { avatar } = profile
  const [deleteComment] = useDeleteCommentMutation()
  const { comment: commentData, createdAt } = comment
  const onDelete = async (event: React.MouseEvent<HTMLDivElement>) => {
    await deleteComment(comment.id)
  }

  return (
    <div className={'flex justify-between'}>
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
      {userId === comment.user.id && (
        <div onClick={onDelete}>
          <TrashIcon className={'h-4 w-4 cursor-pointer text-gray-700'} />
        </div>
      )}
    </div>
  )
}

export default PostCommentItem
