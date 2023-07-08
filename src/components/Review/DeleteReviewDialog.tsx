import { Fragment, useState } from 'react'
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Typography, Rating } from '@material-tailwind/react'
import { useDeleteMyReviewMutation } from '../../redux/api/reviewApi'
import { TrashIcon } from '@heroicons/react/24/outline'
import { ReviewByUserAndPlace } from '../../utils/types'
interface PropsState {
  myReview: ReviewByUserAndPlace
  placeId: string
}
const DeleteReviewDialog = (propsState: PropsState) => {
  const { myReview, placeId } = propsState
  const [open, setOpen] = useState(false)
  const [deleteReview] = useDeleteMyReviewMutation()

  const handleOpen = () => setOpen(!open)
  const handleDelete = async () => {
    await deleteReview(placeId)
    setOpen(!open)
  }
  return (
    <Fragment>
      <TrashIcon onClick={handleOpen} className={'h-4 w-4 cursor-pointer'} />
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant='h5' color='blue-gray'>
            Delete review?
          </Typography>
        </DialogHeader>
        <DialogBody divider className='grid place-items-center gap-4'>
          <Rating value={myReview.rating} readonly />
          <Typography className='text-center text-lg font-normal'>{myReview.review}</Typography>
        </DialogBody>
        <DialogFooter className='space-x-2'>
          <Button variant='text' color='blue-gray' onClick={handleOpen}>
            close
          </Button>
          <Button variant='gradient' onClick={handleDelete} color={'red'}>
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  )
}
export default DeleteReviewDialog
