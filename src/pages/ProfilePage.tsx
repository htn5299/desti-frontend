import { MapProfile, UserProfile } from '../components'
import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
function ProfilePage() {
  const { userId } = useParams<{ userId: string }>()

  //todo:  update profile
  return (
    <div className={'grid-col-1 m-auto mt-6 grid w-10/12 gap-4 lg:grid-cols-2 xl:grid-cols-3'}>
      <div className={'lg:col-span-1 xl:col-span-1'}>
        <UserProfile />
      </div>
      <div className={'lg:col-span-1 xl:col-span-2'}>{userId && <MapProfile userId={userId} />}</div>
      <Outlet />
    </div>
  )
}
export default ProfilePage
