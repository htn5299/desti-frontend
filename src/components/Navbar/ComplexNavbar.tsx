import { Navbar, Typography } from '@material-tailwind/react'
import { Link, Outlet } from 'react-router-dom'
import ProfileMenu from './ProfileMenu'
import { FlagIcon, HeartIcon, HomeIcon } from '@heroicons/react/24/outline'
import NavList from './NavList'
import LogoComponent from './Logo'
import UtilList from './UtilList'
export default function ComplexNavbar() {
  return (
    <>
      <nav className='sticky  inset-0 z-10 flex h-16 max-w-full items-center justify-between rounded-none  border-none bg-gray-900 px-8 opacity-90 xl:px-24'>
        <LogoComponent />
        <div className={'hidden xl:block'}>
          <NavList />
        </div>
        <UtilList />
        <ProfileMenu />
      </nav>
      <Outlet />
    </>
  )
}
