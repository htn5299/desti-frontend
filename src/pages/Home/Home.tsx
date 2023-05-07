import { useSelector } from 'react-redux'
import { selectCurrentUser } from 'redux/features/authSlice'

export default function Home() {
  const email = useSelector(selectCurrentUser)
  return (
    <div>
      {email && <div>Hello, {email}!</div>}
      {!email && <div>You are not login</div>}
    </div>
  )
}
