import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import { BellIcon } from '@heroicons/react/24/outline'
import NotificationReviewItem from '../NotificationItem/NotificationReviewItem'
import { NotificationRecipientResponse } from '../../../utils/types'
import { Actions, Services } from '../../../utils/constrains'

const notification: NotificationRecipientResponse = {
  id: 213,
  readAt: null,
  createdAt: new Date('2023-06-26T10:28:29.990Z'),
  updatedAt: new Date('2023-06-26T10:28:29.990Z'),
  notification: {
    id: 199,
    entity: 61,
    action: Actions.POST,
    service: Services.REVIEWS,
    createdAt: new Date('2023-06-26T10:28:29.990Z'),
    updatedAt: new Date('2023-06-26T10:28:29.990Z'),
    actor: {
      id: 2,
      email: 'lui@test.com',
      name: 'Lui'
    }
  }
}
export default function NotificationDropdown() {
  return (
    <Menu>
      <MenuHandler>
        <div className='flex cursor-pointer items-center gap-2 text-gray-50'>
          <BellIcon className={'h-6 w-6'} />
        </div>
      </MenuHandler>
      <MenuList>
        <MenuItem>
          <NotificationReviewItem notification={notification} />
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
