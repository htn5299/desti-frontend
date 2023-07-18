import React, { useEffect, useRef, useState } from 'react'
import ReactMapGL, { GeolocateControl, MapRef, Marker, NavigationControl, Popup } from 'react-map-gl'
import WebMercatorViewport from 'viewport-mercator-project'
import { Coordinates, PlaceWithImage } from '../../utils/types'
import * as process from 'process'
import { useAppDispatch } from '../../redux/store'
import { updateLocation } from '../../redux/features/locationSlice'
import { Link } from 'react-router-dom'
import { ReactComponent as PinkMaker } from '../../assets/makers/mapbox-marker-icon-pink.svg'
import { ReactComponent as BlueMaker } from '../../assets/makers/mapbox-marker-icon-blue.svg'

interface PropState {
  places: PlaceWithImage[]
  isBeenHere: Boolean
}

const applyToArray = (func: any, array: any) => func.apply(Math, array)

const getBoundsForPoints = (places: PlaceWithImage[]) => {
  // Calculate corner values of bounds
  const lastPlaces = places.slice(-5)
  const pointsLong = lastPlaces.map((point) => point.longitude)
  const pointsLat = lastPlaces.map((point) => point.latitude)
  const cornersLongLat: [[number, number], [number, number]] = [
    [applyToArray(Math.min, pointsLong), applyToArray(Math.min, pointsLat)],
    [applyToArray(Math.max, pointsLong), applyToArray(Math.max, pointsLat)]
  ]
  // Use WebMercatorViewport to get center longitude/latitude and zoom
  const viewport = new WebMercatorViewport({ width: 500, height: 500 }).fitBounds(cornersLongLat, { padding: 100 }) // Can also use option: offset: [0, -100]
  const { longitude, latitude, zoom } = viewport
  return zoom <= 20 ? { longitude, latitude, zoom } : { longitude, latitude, zoom: 12 }
}

const MultiLocationMap = ({ places, isBeenHere }: PropState) => {
  const [popupInfo, setPopupInfo] = useState<PlaceWithImage | null>()
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null)
  const mapRef = useRef<MapRef>(null)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (userLocation) {
      dispatch(updateLocation(userLocation))
    }
  }, [dispatch, userLocation])

  const bounds = getBoundsForPoints(places)

  const [viewport, setViewport] = useState({
    ...bounds
  })

  const renderedItems = places.map((place) => {
    return (
      <div key={place.id}>
        <Marker
          latitude={Number(place.latitude)}
          longitude={Number(place.longitude)}
          onClick={(e) => {
            e.originalEvent.stopPropagation()
            setPopupInfo(place)
          }}
        >
          {isBeenHere ? <BlueMaker /> : <PinkMaker />}
        </Marker>
        {popupInfo && (
          <Popup
            anchor='top'
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <Link to={`/places/${popupInfo.id}`}>{popupInfo.name}</Link>
            <img
              width='100%'
              src={`${process.env.REACT_APP_AWS_URL}${popupInfo.images[0].key}`}
              alt={place.images[0].key}
            />
          </Popup>
        )}
      </div>
    )
  })

  return (
    <div className={'h-[15rem] w-full overflow-hidden rounded-xl lg:h-[25rem]'}>
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        initialViewState={{
          latitude: places[places.length - 1].latitude,
          longitude: places[places.length - 1].longitude,
          zoom: 11.5
        }}
        scrollZoom={false}
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        mapStyle={process.env.REACT_APP_MAP_STYLE}
        onMove={(evt) => setViewport(evt.viewState)}
      >
        {renderedItems}
        <GeolocateControl
          position='top-right'
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation
          onGeolocate={(position) => {
            setUserLocation({ longitude: position.coords.longitude, latitude: position.coords.latitude })
          }}
        />
        <NavigationControl position='bottom-right' />
      </ReactMapGL>
    </div>
  )
}

export default MultiLocationMap
