import React, { Fragment } from 'react'
import { Outlet, useOutletContext, useParams } from 'react-router-dom'
import { useGetUserByIdQuery } from '../redux/api/userApi'
import { ListFriends, Profile } from '../components/UserProfile'

type ContextType = { userId: string }

function ProfilePage() {
  const { userId } = useParams<{ userId: string }>()
  const { data: user } = useGetUserByIdQuery(`${userId}`, { skip: !Boolean(userId) })
  //todo:  update profile
  return (
    <Fragment>
      {user && (
        <div className={'grid-col-1 m-auto mt-6 grid w-10/12 gap-4 lg:grid-cols-12'}>
          <div className={'col-span-1 lg:col-span-4'}>
            <Profile user={user} />
          </div>
          <div className={'col-span-1 lg:col-span-6'}>
            <Outlet context={{ userId: userId }} />
          </div>
          <div className={'col-span-1 lg:col-span-2'}>
            <ListFriends user={user} />
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default ProfilePage

export function useUser() {
  return useOutletContext<ContextType>()
}
