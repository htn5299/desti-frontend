import React from 'react'
import { Avatar } from '@material-tailwind/react'
import AvatarImage from '../../assets/logos/avatar.png'
const AvatarBanner = ({ avatar }: { avatar: string }) => {
  return (
    <div
      className={
        'flex justify-center rounded-t-xl bg-[url("https://placewziz-nestjs-uploader.s3.ap-southeast-1.amazonaws.com/UserProfile/banner.png")]  '
      }
    >
      <Avatar src={avatar || AvatarImage} alt={'test13'} className={'m-5 h-32 w-32'} />
    </div>
  )
}

export default AvatarBanner
