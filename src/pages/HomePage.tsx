import { SearchBar } from '../components/Search'
import { PostList } from '../components/Post'
import { RootState, useAppSelector } from '../redux/store'
import { useGetHerePlacesByUserQuery, useGetWantPlacesByUserQuery } from '../redux/api/favouriteApi'
import { MultiLocationMap } from '../components/Map'
import { FlagIcon, HeartIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function HomePage() {
  const userId = useAppSelector((state: RootState) => state.user.id)
  const { data: wantPlaces } = useGetWantPlacesByUserQuery(String(userId), {
    skip: !userId,
    refetchOnMountOrArgChange: true
  })
  const { data: herePlaces } = useGetHerePlacesByUserQuery(String(userId), {
    skip: !userId,
    refetchOnMountOrArgChange: true
  })

  return (
    <div className={'mx-2'}>
      <div
        className={'mx-auto flex grid h-screen w-fit max-w-[1444px] grid-cols-1  flex-col gap-5 py-2 xl:grid-cols-11'}
      >
        <div className={'hidden xl:col-span-3 xl:block '}>
          <SearchBar />
        </div>
        <div className={'col-span-1 overflow-y-auto  xl:col-span-5'}>
          <PostList />
          <p className={'text-center text-xl font-light text-gray-500'}>
            You have read all the reviews from your friends.
          </p>
        </div>
        <div className={'hidden xl:col-span-3 xl:block'}>
          {herePlaces && (
            <>
              <div className={'flex gap-2 font-semibold text-gray-800'}>
                <FlagIcon className={'h-6 w-6'} />
                <p>Been Here</p>
              </div>
              <MultiLocationMap places={herePlaces} isBeenHere={true} />
            </>
          )}
          <div className={'my-4'} />
          {wantPlaces && (
            <>
              <div className={'flex gap-2 font-semibold text-gray-800'}>
                <HeartIcon className={'h-6 w-6'} />
                <p>Want to go</p>
              </div>
              <MultiLocationMap places={wantPlaces} isBeenHere={false} />
            </>
          )}
        </div>
      </div>
    </div>
  )
  // <PostList />
}
