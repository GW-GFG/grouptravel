'use client'

import styles from './DashboardMap.module.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';

// import elements for Google map
import GoogleMap from '../utils/GoogleMap';

export default function DashboardMap() {

    const currentTrip = useSelector((state) => state.user.value.currentTrip);
     // center of Google map based on trip location
     const [center, setCenter] = useState({
        lat: currentTrip.location.lat,
        lng: currentTrip.location.lng,
    });
    // coordinates of accommodation to be added
    const [position, setPosition] = useState({
        lat: currentTrip.location.lat,
        lng: currentTrip.location.lng,
    });
    // zoom of Google map
    const [zoom, setZoom] = useState(6);

    // Google map camera change
    const INITIAL_CAMERA = {
        center: {lat: currentTrip.location.lat, lng: currentTrip.location.lng},
        zoom: 12
      };
  
      const [cameraProps, setCameraProps] =
      useState(INITIAL_CAMERA);
    const handleCameraChange = useCallback((ev) =>
      setCameraProps(ev.detail)
    );


      return <GoogleMap currentTrip={currentTrip} center={center} markerPos={position} zoom={zoom} {...cameraProps} onCameraChanged={handleCameraChange}/>
}