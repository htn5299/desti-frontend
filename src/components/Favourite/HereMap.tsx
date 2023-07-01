import React, { useEffect } from 'react'
import { PlaceWithImage } from '../../utils/types'
import { useGetHerePlacesByUserQuery } from '../../redux/api/favouriteApi'
import { useUser } from '../../pages/ProfilePage'

const HereMap = () => {
  const context = useUser()
  const { data: places } = useGetHerePlacesByUserQuery(context.userId)
  useEffect(() => {
    console.log(context.userId)
    console.log(places)
  })

  // return <div className={'w-full'}>{places && <MultiLocationMap places={places} />}</div>
  return <div className={'w-full'}>multi div</div>
}

export default HereMap
