import { Link } from 'react-router-dom'
import { Place } from '../../utils/types'
import { useGetImagesQuery } from '../../redux/api/placesApi'
import * as process from 'process'
import { useGetHereUsersByPlaceQuery, useGetWantUsersByPlaceQuery } from '../../redux/api/favouriteApi'

interface PropsState {
  place: Place
}

function PlaceTemplate({ place }: PropsState) {
  const { data: heres } = useGetHereUsersByPlaceQuery(`${place.id}`, { refetchOnMountOrArgChange: true })
  const { data: images } = useGetImagesQuery(`${place.id}`)
  const { data: wants } = useGetWantUsersByPlaceQuery(`${place.id}`, { refetchOnMountOrArgChange: true })
  return (
    <div className={'mx-auto flex h-fit w-full gap-2 rounded bg-white'}>
      <div className={'h-28 w-2/5 rounded'}>
        {images && (
          <img
            src={`${process.env.REACT_APP_AWS_URL}${images[0].key}`}
            className={'h-full w-full rounded-l object-cover'}
            alt={'place'}
          />
        )}
      </div>
      <div className={'my-1 flex w-3/5 flex-col justify-between'}>
        <div>
          <p className={'text-[10px] text-gray-500'}>Viet Nam</p>
          <Link to={`/places/${place.id}`} className={'line-clamp-2 text-sm font-semibold text-gray-900'}>
            {place.name}
          </Link>
        </div>
        <div className={'flex gap-2'}>
          <div className={'flex h-12 w-12 flex-col items-center justify-center gap-0 rounded bg-gray-100'}>
            <p className={'text-center text-xs leading-none text-gray-500'}>Here</p>
            <p className={'text-center text-lg font-semibold leading-tight text-green-700'}>{heres && heres.length}</p>
          </div>
          <div className={'flex h-12 w-12 flex-col items-center justify-center gap-0 rounded bg-gray-100'}>
            <p className={'text-center text-xs leading-none text-gray-500'}>Want</p>
            <p className={'text-center text-lg font-semibold leading-tight text-yellow-800'}>{wants && wants.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceTemplate
