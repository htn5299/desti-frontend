import React from 'react'
import { Typography } from '@material-tailwind/react'
import { UserProfile } from '../../utils/types'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import classNames from 'classnames'
interface PropsState {
  user: UserProfile
}
const InfoProfile = ({ user }: PropsState) => {
  const userAuth = useSelector((state: RootState) => state.user)
  return (
    <div className={'m-4'}>
      <div className={'mb-8'}>
        <Typography className={'text-[2.4rem] font-bold text-gray-900'}>{user.name}</Typography>
        <span className={'font-extralight'}>{user.profile.about}</span>
      </div>
      <div className={'my-8  text-gray-600'}>
        <div className={'flex items-center gap-3 border-t border-t-gray-500 py-2'}>
          <strong className={'text-[2.8rem] text-gray-700'}>2023</strong>
          <p className={'font-semibold'}>JOINED DESTI</p>
        </div>
        <div className={'flex items-center gap-3 border-t border-t-gray-500  py-2'}>
          <strong className={'text-[2.8rem] text-gray-700'}>2</strong>
          <div className={'font-semibold'}>
            <p>PLACES</p>
            <p>I'VE BEEN</p>
          </div>
        </div>
        <div
          className={classNames('flex items-center gap-3 border-t border-t-gray-500 py-2', {
            'border-b border-b-gray-500': userAuth.id === user.id
          })}
        >
          <strong className={'text-[2.8rem] text-gray-700'}>13</strong>
          <div className={'font-semibold'}>
            <p>PLACES</p>
            <p>I WANT TO GO</p>
          </div>
        </div>
      </div>
      {userAuth && userAuth.id === user.id && <EditProfile />}
    </div>
  )
}

export default InfoProfile
