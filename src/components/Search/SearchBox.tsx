import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { toggleSearch } from '../../redux/features/appSlice'
import { SearchInput } from './index'

export default function SearchBox() {
  const dispatch = useAppDispatch()
  const isSearchPopup = useAppSelector((state: RootState) => state.appContext.isSearchPopup)
  const handlePopup = () => {
    dispatch(toggleSearch())
  }

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={isSearchPopup} as={Fragment}>
      <Dialog as='div' className='relative z-10' initialFocus={cancelButtonRef} onClose={() => handlePopup()}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='my-10 flex min-h-full items-center justify-center p-4 text-center sm:items-start sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-white px-4 py-5'>
                  <div className='sm:flex sm:items-start'>
                    <SearchInput />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
// <button
//   type='button'
//   className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
//   onClick={() => handlePopup()}
//   ref={cancelButtonRef}
// >
//   Cancel
// </button>
