import React, { useEffect, useState } from 'react'
import ReactMapGL, { GeolocateControl, Marker, NavigationControl, Popup } from 'react-map-gl'
import * as process from 'process'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Coordinates, Place, PlaceImage } from 'utils/types'
import { ReactComponent as RedMaker } from '../../assets/makers/mapbox-marker-icon-red.svg'
import { useAppDispatch } from '../../redux/store'
import { updateLocation } from '../../redux/features/locationSlice'

interface PropsState {
  place: Place
  placeImage: PlaceImage
}

const MapItem = ({ place, placeImage }: PropsState) => {
  const [popupInfo, setPopupInfo] = useState<Place | null>()
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (userLocation) {
      dispatch(updateLocation(userLocation))
    }
  }, [dispatch, userLocation])
  return (
    <div className={'h-[20rem] w-full overflow-hidden rounded-xl lg:h-[30rem]'}>
      <ReactMapGL
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        initialViewState={{
          latitude: Number(place.latitude),
          longitude: Number(place.longitude),
          zoom: 12
        }}
        mapStyle={process.env.REACT_APP_MAP_STYLE}
        scrollZoom={false}
      >
        <Marker
          latitude={Number(place.latitude)}
          longitude={Number(place.longitude)}
          onClick={(e) => {
            e.originalEvent.stopPropagation()
            setPopupInfo(place)
          }}
        >
          {<RedMaker />}
        </Marker>
        {popupInfo && (
          <Popup
            anchor='top'
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>{popupInfo.name}</div>
            <img width='100%' src={`${process.env.REACT_APP_AWS_URL}${placeImage.key}`} alt={placeImage.key} />
          </Popup>
        )}
        <GeolocateControl
          position='top-right'
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation
          onGeolocate={(position) => {
            setUserLocation({ longitude: position.coords.longitude, latitude: position.coords.latitude })
          }}
        />
        <NavigationControl position={'bottom-right'}></NavigationControl>
      </ReactMapGL>
    </div>
  )
}

export default MapItem
// 10.834931270398235, 106.61141257741589
