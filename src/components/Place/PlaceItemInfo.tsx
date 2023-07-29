import { Typography } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { Place } from '../../utils/types'
import WantHere from './WantHere'
import {
  useGetFavouriteQuery,
  useGetHereUsersByPlaceQuery,
  useGetWantUsersByPlaceQuery,
  useSetFavouriteMutation
} from '../../redux/api/favouriteApi'

interface propsState {
  place: Place
}

const PlaceItemInfo = (props: propsState) => {
  const { place } = props
  const { data: isFavourite, refetch: refetchFav } = useGetFavouriteQuery(place.id, { refetchOnMountOrArgChange: true })
  const { data: hereUsers, refetch: refetchHere } = useGetHereUsersByPlaceQuery(`${place.id}`, {
    refetchOnMountOrArgChange: true
  })
  const { data: wantUsers, refetch: refetchWant } = useGetWantUsersByPlaceQuery(`${place.id}`, {
    refetchOnMountOrArgChange: true
  })
  const [addFavourite] = useSetFavouriteMutation()
  const handleHereClick = async () => {
    try {
      await addFavourite({ placeId: place.id, here: isFavourite && !isFavourite.here })
      refetchFav()
      refetchHere()
    } catch (e) {}
  }
  const handleWantClick = async () => {
    try {
      await addFavourite({ placeId: place.id, want: isFavourite && !isFavourite.want })
      refetchFav()
      refetchWant()
    } catch (e) {}
  }
  return (
    <div className={'col-span-2 flex flex-col gap-3'}>
      <div className={'flex justify-between'}>
        <div>
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
        </div>
        <div>
          <WantHere
            onHereClick={handleHereClick}
            onWantClick={handleWantClick}
            isFavourite={isFavourite}
            hereUsers={!hereUsers ? 0 : hereUsers.length}
            wantUsers={!wantUsers ? 0 : wantUsers.length}
          />
        </div>
      </div>

      <p className={'line-clamp-[13]'}>{place?.description}</p>
    </div>
  )
}

export default PlaceItemInfo
