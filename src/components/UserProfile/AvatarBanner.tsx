import React from 'react'
import { Avatar } from '@material-tailwind/react'
import AvatarImage from '../../assets/profile/avatar.png'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { UserProfile } from '../../utils/types'
import * as process from 'process'
interface PropsState {
  user: UserProfile
}
const AvatarBanner = ({ user }: PropsState) => {
  const userAuth = useSelector((state: RootState) => state.user)
  return (
    <div
      className={`flex justify-center rounded-t-xl bg-[url("https://placewziz-nestjs-uploader.s3.ap-southeast-1.amazonaws.com/profile/banner.png")]`}
    >
      {userAuth.id === user.id && (
        <Avatar
          src={userAuth.profile.avatar ? `${process.env.REACT_APP_AWS_URL}${userAuth.profile.avatar}` : AvatarImage}
          alt={'test13'}
          className={'m-5 h-32 w-32'}
        />
      )}
      {userAuth.id !== user.id && (
        <Avatar
          src={user.profile.avatar ? `${process.env.REACT_APP_AWS_URL}${user.profile.avatar}` : AvatarImage}
          alt={'test13'}
          className={'m-5 h-32 w-32'}
        />
      )}
    </div>
  )
}

export default AvatarBanner
