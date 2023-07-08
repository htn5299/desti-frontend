import { Link } from 'react-router-dom'
import { LogoComponent, NavList, ProfileMenu, UtilList } from './index'

export default function ComplexNavbar() {
  return (
    <>
      <nav className='sticky  inset-0 z-50 flex h-16 max-w-full items-center justify-between rounded-none  border-none bg-gray-900 px-8 opacity-90 xl:px-24'>
        <Link to={'/'}>
          <LogoComponent />
        </Link>
        <div className={'hidden flex-grow xl:block'}>
          <NavList />
        </div>
        <div className={'px-6'}>
          <UtilList />
        </div>
        <ProfileMenu />
      </nav>
    </>
  )
}
