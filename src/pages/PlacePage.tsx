import { useParams } from 'react-router-dom'
import { useGetPlaceQuery } from '../redux/api/placesApi'
import { MapItem, PlaceItemInfo, PlaceItemCarousel, Reviews } from '../components'
import { useGetReviewsByPlaceIdQuery } from '../redux/api/reviewApi'
function PlacePage() {
  const { placeId } = useParams<{ placeId: string }>() as { placeId: string }
  const { data: place, isFetching: isFetchingPlace } = useGetPlaceQuery(placeId as string, {
    refetchOnMountOrArgChange: true
  })
  const { data: reviews, isFetching: isFetchingReview } = useGetReviewsByPlaceIdQuery(placeId as string, {
    refetchOnMountOrArgChange: true
  })
  //todo: socket review
  return (
    <div className={'mx-auto mt-10 grid w-11/12 grid-cols-3 gap-2 lg:w-5/6'}>
      <div className={'col-span-3'}>{!isFetchingPlace && place && <PlaceItemInfo place={place} />}</div>
      <div className={'col-span-3'}> {!isFetchingPlace && place && <PlaceItemCarousel place={place} />}</div>
      <div className={'col-span-2'}>{!isFetchingReview && <Reviews reviews={reviews} placeId={placeId} />}</div>
      <div className={'col-span-1'}>
        <MapItem />
      </div>
    </div>
  )
}

export default PlacePage
