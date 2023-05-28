import React from 'react'
import { AvatarBanner, InfoProfile } from '../index'
import { useGetUserByIdQuery } from '../../redux/api/userApi'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>()
  const { data: user } = useGetUserByIdQuery(`${userId}`)
  return (
    <>
      {user && (
        <div className={'rounded-xl border border-gray-500'}>
          <AvatarBanner avatar={user.profile.avatar} />
          <InfoProfile user={user} />
        </div>
      )}
    </>
  )
}

export default UserProfile
