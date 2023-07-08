import React from 'react'
import { Carousel } from '@material-tailwind/react'
import { PlaceImage } from '../../utils/types'
import * as process from 'process'
interface propsState {
  placeImages: PlaceImage[]
}
const PlaceItemCarousel = ({ placeImages }: propsState) => {
  const renderedImages =
    placeImages &&
    placeImages.map((image) => {
      return (
        <img
          key={image.id}
          src={`${process.env.REACT_APP_AWS_URL}${image.key}`}
          alt='imaasdge-1'
          className='h-full w-full object-cover'
        />
      )
    })
  return (
    <div className={'flex flex-col items-center gap-3 lg:col-span-1'}>
      <div className={'h-[20rem] w-full lg:h-[30rem]'}>
        <Carousel className='rounded-xl'>{renderedImages}</Carousel>
      </div>
    </div>
  )
}

export default PlaceItemCarousel
