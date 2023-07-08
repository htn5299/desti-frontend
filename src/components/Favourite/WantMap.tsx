import MultiLocationMap from '../Map/MultiLocationMap'
import { useUser } from '../../pages/ProfilePage'
import { useGetWantPlacesByUserQuery } from '../../redux/api/favouriteApi'

const WantMap = () => {
  const context = useUser()
  const { data: places } = useGetWantPlacesByUserQuery(context.userId, { refetchOnMountOrArgChange: true })
  return <div className={'w-full'}>{places && <MultiLocationMap places={places} />}</div>
}

export default WantMap
