import { SearchBar } from '../components/Search'
import { PostList } from '../components/Post'
import { RootState, useAppSelector } from '../redux/store'
import { useGetHerePlacesByUserQuery, useGetWantPlacesByUserQuery } from '../redux/api/favouriteApi'
import { MultiLocationMap } from '../components/Map'

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
      <div className={'mx-auto grid max-w-[1444px] grid-cols-1 gap-5 py-2 xl:grid-cols-11'}>
        <div className={'hidden xl:col-span-3 xl:block '}>
          <SearchBar />
        </div>
        <div className={'col-span-1  xl:col-span-5'}>
          <PostList />
          <p className={'text-center text-xl font-light text-gray-500'}>
            You have read all the reviews from your friends.
          </p>
        </div>
        <div className={'hidden xl:col-span-3 xl:block'}>
          {herePlaces && (
            <>
              <div className={'font-semibold text-gray-800'}>Been Here</div>
              <MultiLocationMap places={herePlaces} />
            </>
          )}
          {wantPlaces && (
            <>
              <div className={'font-semibold text-gray-800'}>Want to go</div>
              <MultiLocationMap places={wantPlaces} />
            </>
          )}
        </div>
      </div>
    </div>
  )
  // <PostList />
}
