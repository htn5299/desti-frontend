import React from 'react'
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl'
import * as process from 'process'
import 'mapbox-gl/dist/mapbox-gl.css'
const MapItem = () => {
  return (
    <div className={'h-96 w-full rounded-xl'}>
      <ReactMapGL
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        initialViewState={{
          latitude: 10.7628356,
          longitude: 106.6062647,
          zoom: 10
        }}
        mapStyle='mapbox://styles/mapbox/streets-v12'
      >
        <Marker latitude={10.7628356} longitude={106.6062647} draggable></Marker>
        <NavigationControl position={'bottom-right'}></NavigationControl>
      </ReactMapGL>
    </div>
  )
}

export default MapItem
