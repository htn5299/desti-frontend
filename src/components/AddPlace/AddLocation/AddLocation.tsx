import ReactMapGL, { GeolocateControl, MapRef, Marker, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Geocoder from './Geocoder'
import { RootState, useAppDispatch, useAppSelector } from '../../../redux/store'
import React, { useEffect, useRef, useState } from 'react'
import { updateLocation } from '../../../redux/features/locationSlice'
import { Coordinates } from '../../../utils/types'

const AddLocation = () => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null)
  const mapRef = useRef<MapRef>(null)
  const { longitude, latitude } = useAppSelector((state: RootState) => state.location)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (userLocation) {
      dispatch(updateLocation(userLocation))
    }
  }, [dispatch, userLocation])

  return (
    <div className={'h-[550px] w-full overflow-hidden rounded'}>
      <ReactMapGL
        ref={mapRef}
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        initialViewState={{
          longitude: 106.65535788825068,
          latitude: 10.828187148975585,
          zoom: 8
        }}
        mapStyle={process.env.REACT_APP_MAP_STYLE}
      >
        <Marker
          latitude={latitude}
          longitude={longitude}
          draggable
          onDragEnd={(e) => dispatch(updateLocation({ longitude: e.lngLat.lng, latitude: e.lngLat.lat }))}
        />
        <NavigationControl position='bottom-right' />
        <GeolocateControl
          position='top-left'
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation
          onGeolocate={(position) => {
            setUserLocation({ longitude: position.coords.longitude, latitude: position.coords.latitude })
          }}
        />
        <Geocoder />
      </ReactMapGL>
    </div>
  )
}

export default AddLocation
