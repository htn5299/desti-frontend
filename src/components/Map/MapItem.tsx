import React, { useState } from 'react'
import ReactMapGL, { Marker, NavigationControl, Popup } from 'react-map-gl'
import * as process from 'process'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Place, PlaceImage } from 'utils/types'
interface PropsState {
  place: Place
  placeImage: PlaceImage
}
const MapItem = ({ place, placeImage }: PropsState) => {
  const [popupInfo, setPopupInfo] = useState<Place | null>()
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
        />
        {popupInfo && (
          <Popup
            anchor='top'
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.name} |{' '}
              <a
                target='_new'
                href={`https://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.name}`}
              >
                Wikipedia
              </a>
            </div>
            <img width='100%' src={`${process.env.REACT_APP_AWS_URL}${placeImage.key}`} alt={placeImage.key} />
          </Popup>
        )}
        <NavigationControl position={'bottom-right'}></NavigationControl>
      </ReactMapGL>
    </div>
  )
}

export default MapItem
// 10.834931270398235, 106.61141257741589
