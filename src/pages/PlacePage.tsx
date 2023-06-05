import { useParams } from 'react-router-dom'
import { useGetPlaceQuery } from '../redux/api/placesApi'
import { MapItem, PlaceItemInfo, PlaceItemCarousel, Reviews } from '../components'
import { SocketContext } from '../utils/context/SocketContext'
import { useContext, useEffect } from 'react'
import { RootState, useAppDispatch } from '../redux/store'
import { addReview, clearReviews } from '../redux/features/placeSlice'
import { ReviewByUserAndPlace } from '../utils/types'
import { useSelector } from 'react-redux'
function PlacePage() {
  const { placeId } = useParams<{ placeId: string }>() as { placeId: string }
  const { socket } = useContext(SocketContext)
  const { data: place, isFetching: isFetchingPlace } = useGetPlaceQuery(placeId as string, {
    refetchOnMountOrArgChange: true
  })
  const dispatch = useAppDispatch()
  //todo: socket review
  useEffect(() => {
    if (socket) {
      socket.emit('onPlaceJoin', { placeId })
      socket.on('onReview', (review: ReviewByUserAndPlace) => dispatch(addReview(review)))
    }
    return () => {
      socket?.emit('onPlaceLeave', { placeId })
      dispatch(clearReviews())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  return (
    <div className={'mx-auto mt-10 grid w-11/12 grid-cols-3  gap-x-2 gap-y-6 lg:w-5/6'}>
      <div className={'col-span-3'}>{!isFetchingPlace && place && <PlaceItemInfo place={place} />}</div>
      <div className={'col-span-3'}> {!isFetchingPlace && place && <PlaceItemCarousel place={place} />}</div>
      <div className={'col-span-2'}>
        <Reviews />
      </div>
      <div className={'col-span-1'}>
        <MapItem />
      </div>
    </div>
  )
}

export default PlacePage
