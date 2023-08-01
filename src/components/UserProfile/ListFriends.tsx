import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useListFriendQuery } from '../../redux/api/friendsApi'
import { UserProfile } from '../../utils/types'
import { UsersIcon } from '@heroicons/react/24/outline'
import { FriendItem } from './index'

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
    <div className={'h-[15rem] w-full rounded-xl   border border-gray-500 p-2 text-sm lg:h-[25rem]'}>
      <div className={'mb-2 flex gap-2 border-b pb-2'}>
        <UsersIcon className={'h-5 w-5'} />
        <Link to={`/friend/user/${user.id}`} className={' text-[14px] font-semibold hover:text-gray-700'}>{`${
          user.name.split(' ')[0]
        }’s friends(${numsFriend})`}</Link>
      </div>
      <div>{friends && friends.map((friend) => <FriendItem friend={friend} key={friend.id} />)}</div>
    </div>
  )
}

export default ListFriends
