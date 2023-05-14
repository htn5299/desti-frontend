import { PlaceItem, Reviews } from 'components'
import { useParams } from 'react-router-dom'
import { useGetPlaceQuery, useGetReviewsQuery } from '../redux/api/placesApi'
// import { useGetPlaceQuery, useGetReviewsQuery } from '../redux/api/placesApi'

function PlacePage() {
  const { placeId } = useParams<{ placeId: string }>()
  const { data: place, isFetching: isFetchingPlace } = useGetPlaceQuery(placeId as string, {
    refetchOnMountOrArgChange: true
  })
  const { data: reviews, isFetching: isFetchingReview } = useGetReviewsQuery(placeId as string, {
    refetchOnMountOrArgChange: true
  })
  return (
    <div className={'mx-auto w-11/12 lg:w-5/6'}>
      {!isFetchingPlace && <PlaceItem place={place}></PlaceItem>}
      {!isFetchingReview && <Reviews reviews={reviews}></Reviews>}
    </div>
  )
}

export default PlacePage
