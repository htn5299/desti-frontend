import { Navbar, Typography } from '@material-tailwind/react'
import { Link, Outlet } from 'react-router-dom'
import ProfileMenu from './ProfileMenu'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { selectReviews } from '../../redux/features/placeSlice'
export default function ComplexNavbar({ token }: { token: string }) {
  const navList = (
    <ul className='flex h-full items-center gap-3 lg:gap-8'>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='letter flex h-full items-center  text-gray-800 hover:border-y-2 hover:border-black hover:border-t-transparent hover:text-black '
      >
        <Link to='/' className='flex h-full items-center text-[12px] uppercase lg:text-lg'>
          Home
        </Link>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='letter flex h-full items-center  tracking-widest text-gray-800 hover:border-y-2 hover:border-black hover:border-t-transparent hover:text-black '
      >
        <Link to='users/1?view=been' className='flex items-center text-[12px] uppercase lg:text-lg'>
          Been Here
        </Link>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='letter flex h-full items-center  tracking-widest text-gray-800 hover:border-y-2 hover:border-black hover:border-t-transparent hover:text-black '
      >
        <Link to='users/1?view=want' className='flex items-center text-[12px] uppercase lg:text-lg'>
          Want to Go
        </Link>
      </Typography>
    </ul>
  )

  return (
    <>
      <Navbar className='sticky inset-0 z-10 h-max max-w-full rounded-none border-none bg-gray-300 px-4 py-0 lg:px-32 '>
        <div className='flex items-center justify-between text-blue-gray-900'>
          <div className='flex items-center'>
            <Link to='/' className='mr-4 cursor-pointer text-center font-pirata text-5xl'>
              Desti
            </Link>
          </div>
          <div className='flex h-16 items-center justify-between'>{navList}</div>
          <div className='flex items-center gap-4 border-l border-gray-600 pl-4'>
            <ProfileMenu />
          </div>
        </div>
      </Navbar>
      <Outlet />
    </>
  )
}
