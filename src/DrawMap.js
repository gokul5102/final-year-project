import React, { useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const DrawMap = () => {
  const [center, setCenter] = useState({ lat: 24.4539, lng: 54.3773 });
  const ZOOM_LEVEL = 8;
  const mapRef = useRef();

  const _created = (e) => console.log(e);

  return (
    <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={_created}
          draw={
            {
              /* rectangle: false,
                    circle: false,
                    circlemarker: false,
                    marker: false,
                    polyline: false, */
            }
          }
        />
      </FeatureGroup>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=mIMLHCmBJULiiogMvjQF"
      />
    </MapContainer>
  );
};

export default DrawMap;
