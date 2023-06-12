import PostList from '../components/Post/PostList'
import { SearchBar } from '../components'
export default function HomePage() {
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
        <div className={'hidden xl:col-span-3 xl:block'}>3</div>
      </div>
    </div>
  )
  // <PostList />
}
