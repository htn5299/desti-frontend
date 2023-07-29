import React from 'react'
import ForgetPassword from '../components/Authentication/ForgetPassword'
import { BackHome } from '../components/Authentication'

const ForgetPage = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <BackHome />
      <ForgetPassword />
    </div>
  )
}

export default ForgetPage
