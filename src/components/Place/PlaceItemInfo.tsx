import { Typography } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { Place } from '../../utils/types'
import WantHere from './WantHere'
import { useGetFavouriteQuery, useSetFavouriteMutation } from '../../redux/api/apiFavourite'
interface propsState {
  place: Place
}
const PlaceItemInfo = (props: propsState) => {
  const { place } = props
  const { data: isFavourite, refetch: refreshFav } = useGetFavouriteQuery(place.id)
  const [addFavourite] = useSetFavouriteMutation()
  const handleHereClick = async () => {
    try {
      await addFavourite({ placeId: place.id, here: isFavourite && !isFavourite.here })
      refreshFav()
    } catch (e) {}
  }
  const handleWantClick = async () => {
    try {
      await addFavourite({ placeId: place.id, want: isFavourite && !isFavourite.want })
      refreshFav()
    } catch (e) {}
  }
  return (
    <div className={'col-span-2 flex flex-col gap-3'}>
      <Typography variant={'h2'}>{place?.name}</Typography>
      <div>
        <div className={'flex gap-2'}>
          <span className={'text-gray-700'}>created by</span>
          <Link to={`/users/${place?.createdBy?.id}`} className={'font-bold text-gray-900 hover:underline'}>
            {place?.createdBy?.name}
          </Link>
        </div>
        <Moment className={'text-gray-700'} fromNow>{` ${place?.updatedAt}`}</Moment>
      </div>
      <WantHere onHereClick={handleHereClick} onWantClick={handleWantClick} isFavourite={isFavourite} />
      <p className={'line-clamp-[13]'}>{place?.description}</p>
    </div>
  )
}

export default PlaceItemInfo
