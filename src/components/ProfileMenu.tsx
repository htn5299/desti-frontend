import { Avatar, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { UserProfile } from '../utils/types'
import { setCurrentUser } from '../redux/features/userSlice'
import { logOut, selectCurrentRefreshToken } from '../redux/features/authSlice'
import { useGetMeQuery } from '../redux/api/userApi'
import { useLogoutMutation } from '../redux/api/authApi'
import { useAppDispatch } from '../redux/store'

export default function ProfileMenu() {
  const { data } = useGetMeQuery(undefined, { refetchOnMountOrArgChange: true })
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [logout] = useLogoutMutation()
  const refreshToken: string = useSelector(selectCurrentRefreshToken)
  useEffect(() => {
    dispatch(setCurrentUser(data as UserProfile))
  }, [data, dispatch])
  const handleSignOut = () => {
    try {
      logout({ refreshToken })
      dispatch(logOut())
      navigate('/login')
    } catch (error) {
      console.log(error)
      dispatch(logOut())
      navigate('/login')
    }
  }
  return (
    <Menu
      animate={{
        mount: { y: 0 },
        unmount: { y: 25 }
      }}
    >
      <div className='hidden lg:block'>
        <Typography variant='h6'>
          <Link to='/users/me' className='hover:text-black '>
            {data?.name}
          </Link>
        </Typography>
      </div>
      <MenuHandler>
        <div className='flex cursor-pointer items-center gap-4'>
          <Avatar
            src='https://images.unsplash.com/photo-1682917265580-b2a516f730d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=684&q=80'
            alt='avatar'
          />
        </div>
      </MenuHandler>
      <MenuList>
        <MenuItem>
          <Link to='/users/me'>My Profile</Link>
        </MenuItem>
        <MenuItem>Setting</MenuItem>
        <MenuItem>
          <div onClick={() => handleSignOut()} className='text-red-500'>
            Log out
          </div>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
