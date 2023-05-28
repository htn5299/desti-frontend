import { Avatar, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setCurrentUser } from '../../redux/features/userSlice'
import { logOut, selectCurrentRefreshToken } from '../../redux/features/authSlice'
import { useGetMeQuery } from '../../redux/api/userApi'
import { useLogoutMutation } from '../../redux/api/authApi'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import EmptyAvatar from '../../assets/logos/avatar.png'
export default function ProfileMenu() {
  const { data } = useGetMeQuery(undefined, { refetchOnMountOrArgChange: true })
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [logout] = useLogoutMutation()
  const refreshToken: string = useSelector(selectCurrentRefreshToken)
  const userprofile = useAppSelector((state) => state.user)
  useEffect(() => {
    if (data) {
      dispatch(setCurrentUser(data))
    }
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
          <Link to={`/users/${data?.id}`} className='hover:text-black '>
            {userprofile?.name}
          </Link>
        </Typography>
      </div>
      <MenuHandler>
        <div className='flex cursor-pointer items-center gap-4'>
          <Avatar src={userprofile?.profile.avatar || EmptyAvatar} alt='avatar' />
        </div>
      </MenuHandler>
      <MenuList>
        <Link to={`/users/${data?.id}`}>
          <MenuItem>My Profile</MenuItem>
        </Link>
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
