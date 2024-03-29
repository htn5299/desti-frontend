import { Avatar, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useContext, useEffect } from 'react'
import { setCurrentUser } from '../../redux/features/userSlice'
import { logOut, selectCurrentRefreshToken } from '../../redux/features/authSlice'
import { useGetMeQuery } from '../../redux/api/userApi'
import { useLogoutMutation } from '../../redux/api/authApi'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import EmptyAvatar from '../../assets/profile/avatar.png'
import { SocketContext } from '../../utils/context/SocketContext'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { clearNotifications } from '../../redux/features/notificationSlice'

export default function ProfileMenu() {
  const { data } = useGetMeQuery(undefined, { refetchOnMountOrArgChange: true })
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [logout] = useLogoutMutation()
  const refreshToken: string = useSelector(selectCurrentRefreshToken)
  const userprofile = useAppSelector((state) => state.user)
  const { socket } = useContext(SocketContext)
  useEffect(() => {
    if (data) {
      dispatch(setCurrentUser(data))
    }
  }, [data, dispatch])
  const handleSignOut = () => {
    try {
      logout({ refreshToken })
      dispatch(logOut())
      dispatch(clearNotifications())
      socket?.disconnect()
      navigate('/login')
    } catch (error) {
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
      <MenuHandler>
        <div className='flex cursor-pointer items-center gap-2 text-gray-50'>
          <Avatar
            src={
              userprofile?.profile.avatar
                ? `${process.env.REACT_APP_AWS_URL}${userprofile?.profile.avatar}`
                : EmptyAvatar
            }
            alt='avatar'
          />
          <Typography className={'hidden lg:block'}>{userprofile.name}</Typography>
          <ChevronDownIcon className={'h-6 w-6'} />
        </div>
      </MenuHandler>
      <MenuList>
        <Link to={`/users/${data?.id}`}>
          <MenuItem>My Profile</MenuItem>
        </Link>
        <MenuItem>
          <Link to={'/location'}>Create Location</Link>
        </MenuItem>
        <MenuItem>
          <div onClick={handleSignOut} className='text-red-500'>
            Log out
          </div>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
