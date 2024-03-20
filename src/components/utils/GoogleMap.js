'use client'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import elements for Google map
import {APIProvider, Map, AdvancedMarker, Pin} from '@vis.gl/react-google-maps';

// envoyer les props suivantes au component GoogleMap
export default function GoogleMap(props) {
  const currentTrip = useSelector((state) => state.user.value.currentTrip);
  const [center, setCenter] = useState({
    lat: props.currentTrip.location.lat,
    lng: props.currentTrip.location.lng,
  });
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API;

  useEffect(() => {
    setCenter({ lat: currentTrip.location.lat, lng: currentTrip.location.lng });
    }, [currentTrip]);

    return (
      <APIProvider apiKey={apiKey}>
          <Map
          // defaultCenter={center}
          center={{ lat: props.currentTrip.location.lat, lng: props.currentTrip.location.lng }}
          
          defaultZoom={props.zoom}
          mapId={'idMap'}
          disableDefaultUI={true}
          controlled={false}>
              <AdvancedMarker position={{lat: props.currentTrip.location.lat, lng: props.currentTrip.location.lng}}>
                  <Pin background={'#ef8b7a'} glyphColor={'#000'} borderColor={'#000'} />
              </AdvancedMarker>
              {props.newMarker && <AdvancedMarker position={props.markerPos}>
                  <Pin background={'#7dd087'} glyphColor={'#000'} borderColor={'#000'} />
              </AdvancedMarker>}
              {props.currentTrip.accommodations.length > 0 && props.currentTrip.accommodations.map((accommodation,i) => {
                return <AdvancedMarker key={i} position={{lat: accommodation.location.lat, lng: accommodation.location.lng}}>
                  <Pin background={'#f3ad68'} glyphColor={'#000'} borderColor={'#000'} />
                </AdvancedMarker>
              })}
              {props.currentTrip.activities.length > 0 && props.currentTrip.activities.map((activity, i) => {
                return <AdvancedMarker key={i} position={{lat: activity.location.lat, lng: activity.location.lng}}>
                  <Pin background={'#64b9bd'} glyphColor={'#000'} borderColor={'#000'} />
                </AdvancedMarker>
              })}
          </Map>
      </APIProvider>
    )
}