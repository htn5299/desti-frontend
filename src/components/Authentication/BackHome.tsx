import logo from '../../assets/logos/logo.png'
import { Link } from 'react-router-dom'
export default function BackHome() {
  return (
    <div className='py-5'>
      <Link to='/'>
        <img src={logo} className='h-auto w-48' alt='logo' />
      </Link>
    </div>
  )
}
