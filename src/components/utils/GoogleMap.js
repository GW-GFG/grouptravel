import React, { useRef, useEffect } from "react";

export default function GoogleMap({
    center,
    zoom,
    style,
    position,
    children 
  }) {
    const mapRef = useRef();
    const markerRef = useRef(null); 

    useEffect(() => {
      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
      });

      // Add a marker on map
      markerRef.current = new window.google.maps.Marker({
        position: position, 
        map: map, 
      });

    }, [center, zoom]);

    return (
      <>
        <div ref={mapRef} style={style} />
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { map: mapRef.current });
          }
        })}
      </>
    );
}
