import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../redux/features/authSlice'
import { Navigate, useLocation } from 'react-router-dom'
import ComplexNavbar from '../Navbar/ComplexNavbar'

function RequireAuth() {
  const token = useSelector(selectCurrentToken)
  const location = useLocation()
  return token ? <ComplexNavbar /> : <Navigate to='/login' state={{ from: location }} replace></Navigate>
}

export default RequireAuth
