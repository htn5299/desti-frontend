import { UserProfile } from '../../utils/types'
import { AvatarBanner, InfoProfile } from './index'

interface PropsState {
  user: UserProfile
}

const Profile = (props: PropsState) => {
  const { user } = props
  return (
    <div className={'rounded-xl border border-gray-500'}>
      <AvatarBanner user={user} />
      <InfoProfile user={user} />
    </div>
  )
}

export default Profile
