import { useParams } from 'react-router-dom'
import { FriendHeader, FriendList } from '../components/Friend'
import { useGetUserByIdQuery } from '../redux/api/userApi'

const FriendsPage = () => {
  const { userId } = useParams<{ userId: string }>()
  const { data: user } = useGetUserByIdQuery(`${userId}`, { skip: !Boolean(userId) })
  return (
    <div className={'m-auto mt-2 w-11/12 md:w-5/6 lg:w-4/6'}>
      {user && (
        <>
          <FriendHeader user={user} />
          <div className={'mt-4 border-b-2 font-semibold text-gray-900'}>List Friend</div>
          <FriendList user={user} />
        </>
      )}
    </div>
  )
}

export default FriendsPage
