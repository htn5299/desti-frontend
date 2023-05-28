import PostItem from './PostItem'
import { Fragment, useState } from 'react'
import { Waypoint } from 'react-waypoint'
import { useGetReviewsQuery } from '../../redux/api/reviewApi'

function PostList() {
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
  return <div>{postList}</div>
}

export default PostList
