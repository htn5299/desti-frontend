import React, { useState } from 'react'
import { Avatar } from '@material-tailwind/react'
import { RootState, useAppSelector } from '../../redux/store'
import EmptyAvatar from './../../assets/profile/avatar.png'
import { useCreateCommentMutation } from '../../redux/api/commentApi'
import { Toast } from 'react-toastify/dist/components'
import { toast } from 'react-toastify'

interface PropsState {
  reviewId: number
}

const PostBar = (props: PropsState) => {
  const { reviewId } = props
  const myAvatar = useAppSelector((state: RootState) => state.user.profile.avatar)
  const [commentText, setCommentText] = useState<string>('')
  const [createComment, result] = useCreateCommentMutation()
  const handleCreateComment = async () => {
    if (!commentText) {
      toast.warning('Comment khong duoc rong')
      return
    }
    await createComment({ comment: commentText, reviewId }).unwrap()
    setCommentText('')
  }

  return (
    <div className={'flex gap-2 border-t border-gray-400 p-2'}>
      <div>
        <Avatar size={'sm'} src={myAvatar ? `${process.env.REACT_APP_AWS_URL}${myAvatar}` : EmptyAvatar} />
      </div>
      <div className={'flex w-full flex-col items-start gap-1'}>
        <textarea
          rows={1}
          className={
            ' w-[95%] resize-y rounded border p-1  text-xs text-gray-900 focus:border-gray-500 focus:outline-none'
          }
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        />
        <button
          className={'rounded border border-gray-300 bg-gray-200 px-4 text-gray-800'}
          onClick={() => handleCreateComment()}
        >
          Comment
        </button>
      </div>
    </div>
  )
}

export default PostBar
