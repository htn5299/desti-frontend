import { MenuItem, Typography } from '@material-tailwind/react'
import { createElement } from 'react'
import NotifyList from './NotifyList'
import { CodeBracketSquareIcon, HomeIcon, StarIcon } from '@heroicons/react/24/outline'

// nav list component
const navListItems = [
  {
    label: 'Home',
    icon: HomeIcon
  },
  {
    label: 'Want To',
    icon: StarIcon
  },
  {
    label: 'Been Here',
    icon: CodeBracketSquareIcon
  }
]

export default function NavList() {
  return (
    <ul className='mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center'>
      {navListItems.map(({ label, icon }, key) => (
        <Typography key={label} as='a' href='#' variant='small' color='blue-gray' className='font-bold text-gray-800'>
          <MenuItem className='flex items-center gap-2  lg:rounded-full'>
            {createElement(icon, { className: 'h-[18px] w-[18px]' })} {label}
          </MenuItem>
        </Typography>
      ))}
      <NotifyList />
    </ul>
  )
}
