import React from 'react'
import { Navbar, MobileNav, Typography, IconButton, Collapse } from '@material-tailwind/react'
import { Bars2Icon } from '@heroicons/react/24/outline'
import { Outlet } from 'react-router-dom'
import ProfileMenu from './ProfileMenu'
import NavList from './NavList'

export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false)
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur)

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setIsNavOpen(false))
  }, [])

  return (
    <>
      <Navbar className='mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6'>
        <div className='relative mx-auto flex items-center text-blue-gray-900'>
          <Typography as='a' href='#' className='mr-4 cursor-pointer font-rubik text-xl tracking-widest text-gray-800'>
            Asdfghjk
            {/* <img src={pin} className='ml-2 inline-block max-h-7' alt='logo' /> */}
          </Typography>
          <div className='absolute left-2/4 top-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block'>
            <NavList />
          </div>
          <IconButton
            size='sm'
            color='blue-gray'
            variant='text'
            onClick={toggleIsNavOpen}
            className='ml-auto mr-2 lg:hidden'
          >
            <Bars2Icon className='h-6 w-6' />
          </IconButton>
          <ProfileMenu />
        </div>
        <Collapse open={isNavOpen} className='overflow-scroll'>
          <NavList />
        </Collapse>
      </Navbar>
      <Outlet></Outlet>
    </>
  )
}
