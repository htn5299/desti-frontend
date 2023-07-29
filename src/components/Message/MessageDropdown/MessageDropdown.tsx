import { Menu, Transition } from '@headlessui/react'
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline'
import React, { Fragment } from 'react'
import { RootState, useAppSelector } from '../../../redux/store'
import { ConversationItem } from '../index'

export default function MessageDropdown() {
  const conversations = useAppSelector((state: RootState) => state.conversations)
  return (
    <div className='flex items-center text-right '>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='flex items-center  text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
            <ChatBubbleOvalLeftIcon className=' h-6 w-6 text-white' aria-hidden='true' />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 mt-2 max-h-[500px]  w-80 origin-top-right  divide-y divide-gray-100 overflow-y-auto rounded-md bg-white text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            {conversations &&
              conversations.slice(0, 5).map((conversation) => {
                return <ConversationItem conversation={conversation} key={conversation.id} />
              })}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
