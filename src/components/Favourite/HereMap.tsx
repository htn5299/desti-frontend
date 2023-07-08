import { useGetHerePlacesByUserQuery } from '../../redux/api/favouriteApi'
import { useUser } from '../../pages/ProfilePage'
import { MultiLocationMap } from 'components/Map'

const HereMap = () => {
  const context = useUser()
  const { data: places } = useGetHerePlacesByUserQuery(context.userId, { refetchOnMountOrArgChange: true })

  return <div className={'w-full'}>{places && <MultiLocationMap places={places} />}</div>
}

export default HereMap
