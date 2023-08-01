import React from 'react'
import { Typography } from '@material-tailwind/react'
import { UserProfile } from '../../utils/types'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import classNames from 'classnames'
import { AddFriendButton } from '../Friend'
import { Link } from 'react-router-dom'
import { useGetHerePlacesByUserQuery, useGetWantPlacesByUserQuery } from '../../redux/api/favouriteApi'
import { PencilIcon } from '@heroicons/react/24/outline'

interface PropsState {
  user: UserProfile
}

const InfoProfile = ({ user }: PropsState) => {
  const userAuth = useSelector((state: RootState) => state.user)
  const { data: herePlaces } = useGetHerePlacesByUserQuery(String(user.id), { refetchOnMountOrArgChange: true })
  const { data: wantPlaces } = useGetWantPlacesByUserQuery(String(user.id), { refetchOnMountOrArgChange: true })
  return (
    <div className={'m-4 '}>
      <div className={'mb-8  w-full '}>
        <div className={'flex justify-between'}>
          <Link to={`/users/${user.id}`}>
            <Typography className={'text-[1.6rem]  font-bold text-gray-900'}>{user.name}</Typography>
          </Link>
          {userAuth && userAuth.id === user.id && (
            <Link to={'/users/edit'}>
              <PencilIcon className={'h-4 w-4 text-gray-900'} />
            </Link>
          )}
        </div>
        <span className={'line-clamp-2  font-extralight'}>{user.profile.about}</span>
      </div>
      {userAuth && userAuth.id !== user.id && <AddFriendButton friendId={Number(user.id)} />}

      <div className={'my-8  select-none text-gray-600'}>
        <Link to={'here'}>
          <div className={'flex items-center gap-3 border-t border-t-gray-500  py-2'}>
            <strong className={'text-[2.8rem] text-gray-700'}>{!herePlaces ? '0' : herePlaces.length}</strong>
            <div className={'font-semibold'}>
              <p>PLACES</p>
              <p>I'VE BEEN</p>
            </div>
          </div>
        </Link>
        <Link to={'want'}>
          <div className={'flex items-center gap-3 border-t border-t-gray-500 py-2'}>
            <strong className={'text-[2.8rem] text-gray-700'}>{!wantPlaces ? '0' : wantPlaces.length}</strong>
            <div className={'font-semibold'}>
              <p>PLACES</p>
              <p>I WANT TO GO</p>
            </div>
          </div>
        </Link>
        <div
          className={classNames('flex items-center gap-3 border-t border-t-gray-500 py-2', {
            'border-b border-b-gray-500': userAuth.id === user.id
          })}
        >
          <strong className={'text-[2.8rem] text-gray-700'}>2023</strong>
          <p className={'font-semibold'}>JOINED DESTI</p>
        </div>
      </div>
      {userAuth && userAuth.id === user.id && <EditProfile />}
    </div>
  )
}

export default InfoProfile
