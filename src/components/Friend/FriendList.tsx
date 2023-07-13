import React, { useEffect } from 'react'
import { useListFriendQuery } from '../../redux/api/friendsApi'
import { UserProfile } from '../../utils/types'
import { FriendItem } from './index'

interface PropState {
  user: UserProfile
}

const FriendList = (prop: PropState) => {
  const { user } = prop
  const { data: friends } = useListFriendQuery(Number(user.id))
  const renderedFriends =
    friends && friends.map((friend) => <FriendItem key={Number(friend.id)} friendId={Number(friend.id)} />)

  return <div>{renderedFriends}</div>
}

export default FriendList
