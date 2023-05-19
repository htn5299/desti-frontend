import React from 'react'
import { Button, Carousel } from '@material-tailwind/react'
import { FlagIcon, HeartIcon } from '@heroicons/react/24/outline'
import { Place } from '../../utils/types'
interface propsState {
  place: Place
}
const PlaceItemCarousel = (props: propsState) => {
  return (
    <div className={'flex flex-col items-center gap-3 lg:col-span-1'}>
      <div className={'h-[20rem] w-full lg:h-[30rem]'}>
        <Carousel className='rounded-xl'>
          <img
            src='https://images.unsplash.com/photo-1586006349021-2244d760f2a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80'
            alt='imaasdge-1'
            className='h-full w-full object-cover'
          />
          <img
            src='https://images.unsplash.com/photo-1586004551686-d9c4fab26471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80'
            alt='imasdage-2'
            className='h-full w-full object-cover'
          />
          <img
            src='https://images.unsplash.com/photo-1586004552055-1b683fb10938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
            alt='ima22ge-3'
            className='h-full w-full object-cover'
          />
        </Carousel>
      </div>
    </div>
  )
}

export default PlaceItemCarousel
