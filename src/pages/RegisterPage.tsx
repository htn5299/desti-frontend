import { BackHome } from '../components'
import Register from '../components/Authentication/Register'
export default function RegisterPage() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <BackHome />
      <Register />
    </div>
  )
}
