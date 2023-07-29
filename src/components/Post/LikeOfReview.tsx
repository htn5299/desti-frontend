import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetLikeQueryQuery } from '../../redux/api/likesApi'
import { LikeType } from '../../utils/types'
import { RootState, useAppSelector } from '../../redux/store'

interface PropState {
  reviewId: number
  isLiked: Boolean
}

const LikeOfReview = (props: PropState) => {
  const { reviewId, isLiked } = props
  const { data: likes, refetch } = useGetLikeQueryQuery({ review: reviewId })
  const userId = useAppSelector((state: RootState) => state.user.id)
  const [myLike, setMyLike] = useState<LikeType | null>(null)
  const [likeList, setLikeList] = useState<LikeType[]>([])
  useEffect(() => {
    refetch()
  }, [isLiked, refetch])

  useEffect(() => {
    if (likes) {
      setLikeList(likes.filter((like) => like.isLiked === true))
      setMyLike(likes.filter((like) => like.isLiked === true && like.user.id === userId)[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes])

  const render = likeList && Boolean(likeList.length) && (
    <div className={' border-t border-gray-400 p-2'}>
      {myLike && (
        <Link className={' font-semibold'} to={`/users/${myLike.user.id}`}>
          {`You`}
        </Link>
      )}
      {!myLike && (
        <Link className={' font-semibold'} to={`/users/${likeList[0].user.id}`}>
          {likeList[0].user.name}
        </Link>
      )}
      {likeList.length > 1 && (
        <span>
          {` and`}
          <span className={'font-semibold'}>{` ${likeList.length - 1} other people`}</span>
        </span>
      )}
      <span>{` liked this`}</span>
    </div>
  )
  return <div className={'text-gray-900'}>{likeList && Boolean(likeList.length) && render}</div>
}

export default LikeOfReview
