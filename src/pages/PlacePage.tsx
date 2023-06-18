import { useNavigate, useParams } from 'react-router-dom'
import { useGetImagesQuery, useGetPlaceQuery } from '../redux/api/placesApi'
import { MapItem, PlaceItemInfo, PlaceItemCarousel, Reviews } from '../components'
import { SocketContext } from '../utils/context/SocketContext'
import { useContext, useEffect } from 'react'
import { useAppDispatch } from '../redux/store'
import { addReview, clearReviews, removeReview } from '../redux/features/placeSlice'
import { ReviewByUserAndPlace } from '../utils/types'
function PlacePage() {
  const { placeId } = useParams<{ placeId: string }>() as { placeId: string }
  const { socket } = useContext(SocketContext)
  const { data: place, isFetching: isFetchingPlace } = useGetPlaceQuery(placeId, {
    refetchOnMountOrArgChange: true
  })
  const { data: placeImages } = useGetImagesQuery(placeId)
  const dispatch = useAppDispatch()
  const navitaion = useNavigate()
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
      navitaion('/')
    }
  }, [isFetchingPlace, navitaion, place])

  return (
    <>
      {place && (
        <div className={'mx-auto my-10 grid w-11/12 grid-cols-3  gap-x-2 gap-y-6 lg:w-5/6'}>
          <div className={'col-span-3'}>{!isFetchingPlace && place && <PlaceItemInfo place={place} />}</div>
          <div className={'col-span-3 lg:col-span-2'}>
            {!isFetchingPlace && placeImages && <PlaceItemCarousel placeImages={placeImages} />}
          </div>
          <div className={'col-span-3 lg:col-span-1'}>
            {placeImages && <MapItem place={place} placeImage={placeImages[0]} />}
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
