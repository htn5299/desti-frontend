import PostList from '../components/Post/PostList'
import { SearchBar } from '../components'
export default function HomePage() {
  return (
    <div className={' mx-auto grid w-5/6 grid-cols-1 gap-5 lg:grid-cols-4'}>
      <div className={' col-span-1 mx-auto mt-6 w-full'}>
        <SearchBar />
      </div>
      <div className={'col-span-2 mx-auto w-full'}>
        <PostList />
      </div>
      <div className={'col-span-1 mx-auto mt-6 hidden w-full lg:block'}>Something here</div>
    </div>
  )
  // <PostList />
}
