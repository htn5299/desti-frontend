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

interface PropState {
  friendId: number
}

const AddFriendButton = (prop: PropState) => {
  const userId = useAppSelector((state: RootState) => state.user.id)
  const { friendId } = prop
  const [requestFriend] = useRequestFriendMutation()
  const [deleteFriend, { isLoading }] = useDeleteFriendMutation()
  const { data: checked, refetch, error } = useCheckFriendQuery(friendId)
  const [checkedFriend, setCheckedFriend] = useState<StatusFriend>(StatusFriend.NOT_FOUND)
  const [responseFriend] = useResponseFriendMutation()
  const handleRequest = async () => {
    if (checkedFriend === StatusFriend.NOT_FOUND) {
      await requestFriend(friendId)
      setCheckedFriend(StatusFriend.REQUESTED)
    }
    refetch()
  }
  const handleDelete = async () => {
    await deleteFriend(friendId)
    refetch()
  }
  const handleResponse = async () => {
    if (checkedFriend === StatusFriend.RESPONSE) {
      await responseFriend({ friendId, status: StatusCode.ACCEPTED })
      setCheckedFriend(StatusFriend.FRIEND)
    }
    refetch()
  }

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
  }, [checked, error])

  return (
    <>
      {checkedFriend === StatusFriend.ME && <div>this is you</div>}
      {checkedFriend === StatusFriend.FRIEND && <div>this is your friend</div>}
      {checkedFriend === StatusFriend.NOT_FOUND && (
        <button className={'rounded border border-gray-900 bg-gray-300 px-3 py-0'} onClick={handleRequest}>
          Add friend
        </button>
      )}
      {checkedFriend === StatusFriend.REQUESTED && (
        <button className={'rounded border border-gray-900 bg-gray-300 px-3 py-0'} onClick={handleDelete}>
          Cancel request
          {isLoading && <Spinner />}
        </button>
      )}
      {checkedFriend === StatusFriend.RESPONSE && (
        <button className={'rounded border border-gray-900 bg-gray-300 px-3 py-0'} onClick={handleResponse}>
          response
        </button>
      )}
    </>
  )
}

export default AddFriendButton
