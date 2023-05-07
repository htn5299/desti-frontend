import { BellIcon, Square3Stack3DIcon } from '@heroicons/react/24/outline'
import { Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'
import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

const test = (
  <span>
    <strong className='font-bold'>Lê Quang Huy</strong> đã đăng trong{' '}
    <strong className='font-bold'>NHÓM LỚP 21DTV2</strong>: Chào các bạn! Thầy gửi đáp án bài tập củng cố...
  </span>
)

// nav list menu
const navListMenuItems = [
  {
    // title: 'Material Tailwind PRO',
    // description: 'A complete set of UI Elements for building faster websites in less time.'
    id: 1,
    description: test
  },
  {
    id: 2,
    description: test
  },
  {
    id: 3,
    description: test
  }
]

export default function NotifyList() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const renderItems = navListMenuItems.map(({ id, description }) => {
    return (
      <Link to='#' key={id}>
        <MenuItem>
          <Typography variant='small' color='gray' className='font-normal'>
            {description}
          </Typography>
        </MenuItem>
      </Link>
    )
  })

  return (
    <Fragment>
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as='a' href='#' variant='small' className='font-normal'>
            <MenuItem className='hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full'>
              <BellIcon className='h-[18px] w-[18px] ' />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className='hidden w-[36rem] grid-cols-1 gap-3 overflow-visible lg:grid'>
          <ul className='col-span-4 flex w-full flex-col gap-1'>{renderItems}</ul>
        </MenuList>
      </Menu>
      <MenuItem className='flex items-center gap-2 text-blue-gray-900 lg:hidden'>
        <Square3Stack3DIcon className='h-[18px] w-[18px]' /> Pages{' '}
      </MenuItem>
      <ul className='ml-6 flex w-full flex-col gap-1 lg:hidden'>{renderItems}</ul>
    </Fragment>
  )
}
