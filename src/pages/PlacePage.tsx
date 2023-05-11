import { useParams } from 'react-router-dom'

function PlacePage() {
  const { placeId } = useParams<{ placeId: string }>()
  return <div>{`PlacePage ${placeId}`}</div>
}

export default PlacePage
