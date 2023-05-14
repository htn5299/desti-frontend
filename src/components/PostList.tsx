import { useGetPlacesQuery } from '../redux/api/placesApi'
import PostItem from './PostItem'

function PostList() {
  const { data, isFetching } = useGetPlacesQuery()
  const placesList = data?.map((place) => {
    return <PostItem key={place.id} place={place}></PostItem>
  })

  return <div className='flex flex-col items-center gap-3'>{!isFetching && placesList}</div>
}

export default PostList
