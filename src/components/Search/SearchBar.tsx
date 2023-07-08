import SearchButton from './SearchButton'
import { useTopPlacesQuery } from '../../redux/api/placesApi'
import PlaceTemplate from '../Place/PlaceTemplate'

export default function SearchBar() {
  const { data: topPlaces } = useTopPlacesQuery('5')
  let renderedPlace = topPlaces && topPlaces.map((place) => <PlaceTemplate key={place.id} place={place} />)
  return (
    <div className={'rounded bg-gray-100 py-1'}>
      <div className={'mx-4 my-6 '}>
        <SearchButton />
      </div>
      <div className={'mx-4'}>
        <p className={'mb-3 text-gray-800'}>Popular destinations</p>
        <div className={'mb-4 flex flex-col gap-2'}>{renderedPlace}</div>
      </div>
    </div>
  )
}
