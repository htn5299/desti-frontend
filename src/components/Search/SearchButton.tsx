import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useAppDispatch } from '../../redux/store'
import { toggleSearch } from '../../redux/features/appSlice'

const SearchButton = () => {
  const dispatch = useAppDispatch()
  const handlePopup = () => {
    dispatch(toggleSearch())
  }
  return (
    <div
      className={'flex w-full cursor-pointer items-center justify-center gap-2 rounded  bg-gray-800 py-2 text-gray-50'}
      onClick={() => handlePopup()}
    >
      <MagnifyingGlassIcon className={'h-5 w-5'} />
      <p className={'text-sm'}>Search Desti</p>
    </div>
  )
}

export default SearchButton
