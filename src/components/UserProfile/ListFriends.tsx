import React, { useEffect, useState } from 'react'
import { useListFriendQuery } from '../../redux/api/friendsApi'
import { UserProfile } from '../../utils/types'
interface PropsState {
  user: UserProfile
}

const ListFriends = (props: PropsState) => {
  const { user } = props
  const [numsFriend, setNumsFriend] = useState(0)
  const { data: friends } = useListFriendQuery(user.id as number)
  useEffect(() => {
    if (friends && friends.length) {
      setNumsFriend(friends.length)
    }
  }, [friends])

  return (
    <div className={'text-sm '}>
      <p className={'font-semibold uppercase'}>{`${user.name.split(' ')[0]}’S FRIENDS (${numsFriend})`}</p>
      <div>{friends && friends.map((friend) => <div>{friend.name}</div>)}</div>
    </div>
  )
}

export default ListFriends
