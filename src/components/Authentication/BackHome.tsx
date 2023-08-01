import { Link } from 'react-router-dom'

export default function BackHome() {
  return (
    <div className='py-5'>
      <Link
        to='/'
        className='mr-4 cursor-pointer text-center font-borel text-5xl font-bold leading-normal text-gray-700'
      >
        Desti
      </Link>
    </div>
  )
}
