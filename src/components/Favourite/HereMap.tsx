import React from 'react'
import MultiLocationMap from '../Map/MultiLocationMap'
import { PlaceWithImage } from '../../utils/types'
interface PropState {
  places: PlaceWithImage[]
}
const HereMap = ({ places }: PropState) => {
  return (
    <div className={'w-full'}>
      <MultiLocationMap places={places} />
    </div>
  )
}

export default HereMap
