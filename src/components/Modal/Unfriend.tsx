import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useDeleteFriendMutation } from '../../redux/api/friendsApi'
import { CheckIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

interface PropState {
  friendId: number
}

export default function Unfriend(prop: PropState) {
  const { friendId } = prop
  const [isHover, setIsHover] = useState<Boolean>(false)
  const [isOpen, setIsOpen] = useState(false)
  const [deleteFriend] = useDeleteFriendMutation()

  const handleDelete = async () => {
    await deleteFriend(friendId)
    setIsOpen(false)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div>
        <div className={'flex items-center gap-2'}>
          <button
            onClick={openModal}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={'w-32 rounded border border-gray-500 bg-gray-200 py-1  font-semibold text-gray-700'}
          >
            {isHover ? (
              'Unfriend'
            ) : (
              <div className={'flex justify-center gap-1'}>
                <CheckIcon className={'h-5 w-5'} />
                <span>Friend</span>
              </div>
            )}
          </button>
          <Link
            to={`/message/${friendId}`}
            className={'w-fit rounded border border-gray-500 bg-gray-200 px-5 py-1  font-semibold text-gray-700'}
          >
            Message
          </Link>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Unfriend?
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      This will remove activity from your updates feed, and your own activity will stop appearing in
                      their updates feed.
                    </p>
                  </div>

                  <div className='mt-4 flex gap-2'>
                    <button
                      type='button'
                      className={'w-32 rounded  bg-gray-800 py-1   font-semibold text-white'}
                      onClick={handleDelete}
                    >
                      Confirm
                    </button>
                    <button
                      type='button'
                      className={'w-32 rounded border border-gray-500 bg-gray-200 py-1  font-semibold text-gray-700'}
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
