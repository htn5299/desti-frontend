import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../redux/features/authSlice'
import { Navigate, useLocation } from 'react-router-dom'
import React, { FC } from 'react'

const RequireAuth: FC<React.PropsWithChildren> = ({ children }) => {
  const token = useSelector(selectCurrentToken)
  const location = useLocation()
  return token ? <>{children}</> : <Navigate to='/login' state={{ from: location }} replace />
}
export default RequireAuth
