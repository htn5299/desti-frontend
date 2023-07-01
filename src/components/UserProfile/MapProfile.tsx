import { useGetHerePlacesByUserQuery, useGetWantPlacesByUserQuery } from '../../redux/api/favouriteApi'
import { UserCircleIcon } from '@heroicons/react/20/solid'
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react'
import React from 'react'
import WantMap from '../Favourite/WantMap'
export default function MapProfile({ userId }: { userId: string }) {
  const { data: herePlaces } = useGetHerePlacesByUserQuery(userId, { refetchOnMountOrArgChange: true })
  const { data: wantPlaces } = useGetWantPlacesByUserQuery(userId, { refetchOnMountOrArgChange: true })
  const data = [
    // {
    //   label: 'Been Here',
    //   value: 'dashboard',
    //   icon: Square3Stack3DIcon,
    //   desc: herePlaces && Boolean(herePlaces.length) ? <HereMap places={herePlaces} /> : <div>no here</div>
    // },
    {
      label: 'Want to Go',
      value: 'profile',
      icon: UserCircleIcon,
      desc: wantPlaces && Boolean(wantPlaces.length) ? <WantMap places={wantPlaces} /> : <div>no want</div>
    }
  ]
  return (
    <div>
      <Tabs value='dashboard' id={'tabs'}>
        <TabsHeader
          className='rounded-none border-b border-blue-gray-50 bg-transparent p-0'
          indicatorProps={{
            className: 'bg-transparent border-b-2 border-blue-500 shadow-none rounded-none'
          }}
        >
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div className='flex items-center gap-2'>
                {React.createElement(icon, { className: 'w-5 h-5' })}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  )
}
