import React, { useEffect, useState } from 'react'
import {
  useCheckFriendQuery,
  useDeleteFriendMutation,
  useRequestFriendMutation,
  useResponseFriendMutation
} from '../../redux/api/friendsApi'
import { StatusCode } from '../../utils/types'
import { StatusFriend } from '../../utils/constrains'
import { isErrorWithMessage } from '../../utils/helpers'
import { Spinner } from '../Skeleton'
import { RootState, useAppSelector } from '../../redux/store'
import { Unfriend } from '../Modal'
import { useCreateConversationMutation } from '../../redux/api/conversationApi'

interface PropState {
  friendId: number
}

const AddFriendButton = (prop: PropState) => {
  const userId = useAppSelector((state: RootState) => state.user.id)
  const { friendId } = prop
  const [requestFriend] = useRequestFriendMutation()
  const [deleteFriend, { isLoading }] = useDeleteFriendMutation()
  const { data: checked, error } = useCheckFriendQuery(friendId, { refetchOnMountOrArgChange: true })
  const [checkedFriend, setCheckedFriend] = useState<StatusFriend>(StatusFriend.NOT_FOUND)
  const [responseFriend, { data }] = useResponseFriendMutation()
  const [createConversation] = useCreateConversationMutation()
  const handleRequest = async () => {
    if (checkedFriend === StatusFriend.NOT_FOUND) {
      await requestFriend(friendId)
      setCheckedFriend(StatusFriend.REQUESTED)
    }
  }
  const handleDelete = async () => {
    await deleteFriend(friendId)
    setCheckedFriend(StatusFriend.NOT_FOUND)
  }
  const handleResponse = async (status: StatusCode) => {
    if (checkedFriend === StatusFriend.RESPONSE) {
      await responseFriend({ friendId, status }).unwrap()
      setCheckedFriend(StatusFriend.FRIEND)
    }
  }
  useEffect(() => {
    if (data) {
      createConversation({ email: data.requester.email, message: 'new conversation' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (checked) {
      if (checked.status === StatusCode.PENDING) {
        if (userId && userId === checked.receiver.id) {
          setCheckedFriend(StatusFriend.RESPONSE)
        } else {
          setCheckedFriend(StatusFriend.REQUESTED)
        }
      } else if (checked.status === StatusCode.DECLINED) {
        setCheckedFriend(StatusFriend.NOT_FOUND)
      } else if (checked.status === StatusCode.ACCEPTED) {
        setCheckedFriend(StatusFriend.FRIEND)
      }
    }
    if (error) {
      if (isErrorWithMessage(error)) {
        if (error.status === 400) {
          setCheckedFriend(StatusFriend.ME)
        } else if (error.status === 404) {
          setCheckedFriend(StatusFriend.NOT_FOUND)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, error])

  return (
    <>
      {checkedFriend === StatusFriend.ME && <div>this is you</div>}
      {checkedFriend === StatusFriend.FRIEND && <Unfriend friendId={friendId} />}
      {checkedFriend === StatusFriend.NOT_FOUND && (
        <button
          className={'w-fit rounded border border-gray-500 bg-gray-200 px-2 py-1  font-semibold text-gray-700'}
          onClick={handleRequest}
        >
          Add friend
        </button>
      )}
      {checkedFriend === StatusFriend.REQUESTED && (
        <button
          className={'w-fit rounded border border-gray-500 bg-gray-200 px-2 py-1  font-semibold text-gray-700'}
          onClick={handleDelete}
        >
          Cancel request
          {isLoading && <Spinner />}
        </button>
      )}
      {checkedFriend === StatusFriend.RESPONSE && (
        <div className={'flex gap-2'}>
          <button
            className={'w-fit rounded bg-gray-800  px-2 py-1   font-semibold text-white'}
            onClick={() => handleResponse(StatusCode.ACCEPTED)}
          >
            Confirm
          </button>
          <button
            className={'w-fit rounded border border-gray-500 bg-gray-200 px-2 py-1  font-semibold text-gray-700'}
            onClick={() => handleResponse(StatusCode.DECLINED)}
          >
            Delete
          </button>
        </div>
      )}
    </>
  )
}

export default AddFriendButton
