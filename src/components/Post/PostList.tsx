import PostItem from './PostItem'
import { Fragment, useState } from 'react'
import { Waypoint } from 'react-waypoint'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../redux/store'
import { setPage } from '../../redux/features/appSlice'
import { useGetReviewsQuery } from '../../redux/api/reviewApi'

function PostList() {
  const dispatch = useAppDispatch()
  // const page = useSelector((state: RootState) => state.appContext.page)
  const [page, setPage] = useState(1)
  const { data: reviews } = useGetReviewsQuery(page)

  const postList = reviews?.map((review, i) => {
    return (
      <Fragment key={review.id}>
        <PostItem review={review} />
        {i === reviews.length - 2 && (
          <Waypoint
            onEnter={() => {
              // dispatch(setPage())
              setPage((prevState) => prevState + 1)
            }}
          />
        )}
      </Fragment>
    )
  })
  return <div className='flex flex-col items-center gap-3'>{postList}</div>
}

export default PostList
