import { Fragment, useState } from 'react'
import { Waypoint } from 'react-waypoint'
import { useGetReviewsNewsfeedQuery } from '../../redux/api/newsfeedApi'
import { PostItem } from './index'

function PostList() {
  const [page, setPage] = useState(1)
  const { data: reviews } = useGetReviewsNewsfeedQuery(page)
  const postList = reviews?.map((review, i) => {
    return (
      <Fragment key={review.id}>
        <PostItem review={review} />
        {i === reviews.length - 2 && (
          <Waypoint
            onEnter={() => {
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
