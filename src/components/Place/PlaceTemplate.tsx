import { Typography } from '@material-tailwind/react'
import { Place } from '../../utils/types'
interface PropsState {
  place: Place
}
function PlaceTemplate({ place }: PropsState) {
  return (
    <div className={'mx-auto mb-4 flex h-fit w-full gap-2 rounded bg-white'}>
      <div className={'h-28 w-40 rounded'}>
        <img src={'https://picsum.photos/200/300'} className={'h-full w-full rounded-l object-cover'} alt={'place'} />
      </div>
      <div className={'my-1 flex flex-col justify-between'}>
        <div>
          <p className={'text-[10px] text-gray-500'}>Viet Nam</p>
          <Typography variant={'h3'} className={' line-clamp-2 text-xs text-gray-900'}>
            {place.name}
          </Typography>
        </div>
        <div className={'flex gap-2'}>
          <div className={'flex h-12 w-12 flex-col items-center justify-center gap-0 rounded bg-gray-100'}>
            <p className={'text-center text-xs leading-none text-gray-500'}>Here</p>
            <p className={'text-center text-lg font-semibold leading-tight text-green-700'}>691</p>
          </div>
          <div className={'flex h-12 w-12 flex-col items-center justify-center gap-0 rounded bg-gray-100'}>
            <p className={'text-center text-xs leading-none text-gray-500'}>Rating</p>
            <p className={'text-center text-lg font-semibold leading-tight text-yellow-800'}>4.0</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceTemplate
