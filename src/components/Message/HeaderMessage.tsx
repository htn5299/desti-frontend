import React from 'react'
import { Link } from 'react-router-dom'
import { LogoComponent } from '../Navbar'

const HeaderMessage = () => {
  return (
    <Link to={'/'}>
      <div className={'flex h-12 items-center bg-gray-600 px-4'}>
        <p className={'text-2xl font-bold text-gray-300'}>Desti</p>
      </div>
    </Link>
  )
}

export default HeaderMessage
