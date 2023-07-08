import { useControl } from 'react-map-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { useAppDispatch } from '../../../redux/store'
import { updateLocation } from '../../../redux/features/locationSlice'

const Geocoder = () => {
  const dispatch = useAppDispatch()
  const ctrl = new MapBoxGeocoder({
    accessToken: `${process.env.REACT_APP_MAP_TOKEN}`,
    marker: false,
    collapsed: true,
    placeholder: 'search e.g. Lincoln Park'
  })
  useControl(() => ctrl)
  ctrl.on('result', (e) => {
    const coords = e.result.geometry.coordinates
    dispatch(updateLocation({ latitude: coords[1], longitude: coords[0] }))
  })
  return null
}

export default Geocoder
