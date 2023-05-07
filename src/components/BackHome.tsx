import { Link } from 'react-router-dom'
import { Typography } from '@material-tailwind/react'

export default function BackHome() {
  return (
    <div className='py-5'>
      <Typography href='#' className='cursor-pointer font-rubik  text-3xl tracking-widest text-gray-800'>
        <Link to='/'>Asdfghjk</Link>
      </Typography>
    </div>
  )
}
