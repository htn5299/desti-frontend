import { useSelector } from 'react-redux'
import { selectCurrentToken } from './authSlice'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ComplexNavbar } from 'components'

function RequireAuth() {
  const token = useSelector(selectCurrentToken)
  const location = useLocation()
  return token ? <ComplexNavbar></ComplexNavbar> : <Navigate to='/login' state={{ from: location }} replace></Navigate>
}

export default RequireAuth
