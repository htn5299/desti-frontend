import { MapProfile, UserProfile } from '../components'
import React from 'react'
function ProfilePage() {
  //todo:  update profile
  return (
    <div className={'grid-col-1 m-auto mt-6 grid w-10/12 gap-2 lg:grid-cols-3'}>
      <div className={'lg:col-span-1'}>
        <UserProfile />
      </div>
      <div className={'lg:col-span-2'}>
        <MapProfile />
      </div>
    </div>
  )
}
export default ProfilePage
