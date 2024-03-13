'use client'

// import elements for Google map
import {APIProvider, Map, AdvancedMarker, Pin} from '@vis.gl/react-google-maps';
const apiKey="AIzaSyAtN3JpGGPLuZkaD7j2zoSB0vE3e_B-Jn8"

// envoyer les props suivantes au component GoogleMap
export default function GoogleMap(props) {
    //console.log('props from GoogleMap.js: ', props);
    return (
      <APIProvider apiKey={'AIzaSyAtN3JpGGPLuZkaD7j2zoSB0vE3e_B-Jn8'}>
          <Map
          defaultCenter={{lat: props.currentTrip.location.lat, lng: props.currentTrip.location.lng}}
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
              {props.currentTrip.accomodations.length > 0 && props.currentTrip.accomodations.map((accomodation,i) => {
                return <AdvancedMarker key={i} position={{lat: accomodation.location.lat, lng: accomodation.location.lng}}>
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