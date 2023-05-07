import React from 'react'
import { Navbar, MobileNav, Typography, Button, IconButton } from '@material-tailwind/react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
export default function Header() {
  const [openNav, setOpenNav] = React.useState(false)

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false))
  }, [])

  const navList = (
    <ul className='mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      <Typography as='li' variant='small' color='blue-gray' className='p-1 font-normal'>
        <Link to='/' className='flex items-center'>
          Home
        </Link>
      </Typography>
      <Typography as='li' variant='small' color='blue-gray' className='p-1 font-normal'>
        <a href='#' className='flex items-center'>
          List
        </a>
      </Typography>
      <Typography as='li' variant='small' color='blue-gray' className='p-1 font-normal'>
        <a href='#' className='flex items-center'>
          Blocks
        </a>
      </Typography>
      <Typography as='li' variant='small' color='blue-gray' className='p-1 font-normal'>
        <a href='#' className='flex items-center'>
          Docs
        </a>
      </Typography>
    </ul>
  )

  return (
    <>
      <Navbar className='sticky inset-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4'>
        <div className='flex items-center justify-between gap-10 text-blue-gray-900'>
          <Link to='/'>
            <Typography
              as='a'
              href='#'
              className='mr-4 cursor-pointer font-rubik text-3xl tracking-widest text-gray-800'
            >
              Asdfghjk
              {/* <img src={pin} className='ml-2 inline-block max-h-7' alt='logo' /> */}
            </Typography>
          </Link>
          <div className='flex grow items-center justify-between gap-4'>
            <div className='mr-4 hidden lg:block'>{navList}</div>
            <div className='flex w-max gap-4'>
              <Link to='/auth/login'>
                <Button variant='text' size='sm' className='hidden lg:inline-block'>
                  <span>Log in</span>
                </Button>
              </Link>
              <Link to='/auth/register'>
                <Button variant='gradient' size='sm' className='hidden lg:inline-block'>
                  <span>Register</span>
                </Button>
              </Link>
            </div>
            <IconButton
              variant='text'
              className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  className='h-6 w-6'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <Link to='/auth/login'>
            <Button variant='text' size='sm' fullWidth className='mb-2'>
              <span>Log in</span>
            </Button>
          </Link>
          <Link to='/auth/register'>
            <Button variant='gradient' size='sm' fullWidth className='mb-2'>
              <span>Register</span>
            </Button>
          </Link>
        </MobileNav>
      </Navbar>
      <Outlet></Outlet>
    </>
  )
}
