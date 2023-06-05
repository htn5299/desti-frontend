import { AvatarBanner, InfoProfile } from '../index'
import { useGetUserByIdQuery } from '../../redux/api/userApi'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../redux/store'

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>()
  const { data: user } = useGetUserByIdQuery(`${userId}`)
  const userprofile = useAppSelector((state) => state.user)
  // useEffect(() => {
  //   console.log(user)
  // }, [user])

  return (
    <>
      {user && (
        <div className={'rounded-xl border border-gray-500'}>
          <AvatarBanner avatar={userprofile.profile.avatar} />
          <InfoProfile user={userprofile} />
        </div>
      )}
    </>
  )
}

export default UserProfile
