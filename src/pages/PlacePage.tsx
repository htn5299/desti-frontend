import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetImagesQuery, useGetPlaceQuery } from '../redux/api/placesApi'
import { SocketContext } from '../utils/context/SocketContext'
import { useContext, useEffect } from 'react'
import { useAppDispatch } from '../redux/store'
import { addReview, clearReviews, removeReview } from '../redux/features/placeSlice'
import { ReviewByUserAndPlace } from '../utils/types'
import { PlaceItemCarousel, PlaceItemInfo } from '../components/Place'
import { MapItem } from '../components/Map'
import { Reviews } from '../components/Review'
import { ArrowTopRightOnSquareIcon, MapPinIcon } from '@heroicons/react/24/outline'

function PlacePage() {
  const { placeId } = useParams<{ placeId: string }>() as { placeId: string }
  const { socket } = useContext(SocketContext)
  const { data: place, isFetching: isFetchingPlace } = useGetPlaceQuery(placeId, {
    refetchOnMountOrArgChange: true
  })
  const { data: placeImages } = useGetImagesQuery(placeId)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (socket) {
      socket.emit('onPlaceJoin', { placeId })
      socket.on('onReview', (review: ReviewByUserAndPlace) => dispatch(addReview(review)))
      socket.on('onDeleteReview', (review: ReviewByUserAndPlace) => dispatch(removeReview(review.id)))
    }
    return () => {
      socket?.emit('onPlaceLeave', { placeId })
      dispatch(clearReviews())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])
  useEffect(() => {
    if (!place && !isFetchingPlace) {
      navigate('/')
    }
  }, [isFetchingPlace, navigate, place])

  return (
    <>
      {place && placeImages && (
        <div className={'mx-auto my-10 grid w-11/12 grid-cols-3  gap-x-2 gap-y-6 lg:w-5/6'}>
          <div className={'col-span-3'}>{!isFetchingPlace && place && <PlaceItemInfo place={place} />}</div>
          <div className={'col-span-3 lg:col-span-2'}>
            {!isFetchingPlace && <PlaceItemCarousel placeImages={placeImages} />}
          </div>
          <div className={'col-span-3 flex flex-col  gap-1 lg:col-span-1'}>
            <MapItem place={place} placeImage={placeImages[0]} />
            <div className={'flex gap-2 text-gray-900'}>
              <MapPinIcon className={'h-6 w-6'} />
              <p className={'line-clamp-1'}>{place.address}</p>
            </div>
            <Link
              to={`http://www.google.com/maps/place/${place.latitude},${place.longitude}`}
              target='_blank'
              className={'flex gap-1 text-green-700'}
            >
              <span>View on Google Maps </span>
              <ArrowTopRightOnSquareIcon className={'inline-block h-4 w-4'} />
            </Link>
          </div>
          <div className={'col-span-3 lg:col-span-2'}>
            <Reviews />
          </div>
        </div>
      )}
    </>
  )
}

export default PlacePage
