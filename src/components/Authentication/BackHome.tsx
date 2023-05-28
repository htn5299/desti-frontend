import logo from '../../assets/logos/logo.png'
import { Link } from 'react-router-dom'
export default function BackHome() {
  return (
    <div className='py-5'>
      <Link to='/' className='mr-4 cursor-pointer text-center font-pirata text-7xl'>
        Desti
      </Link>
    </div>
  )
}
