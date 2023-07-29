import React from 'react'
import { BackHome } from '../components/Authentication'
import ResetPassword from '../components/Authentication/ResetPassword'

const ResetPage = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <BackHome />
      <ResetPassword />
    </div>
  )
}

export default ResetPage
