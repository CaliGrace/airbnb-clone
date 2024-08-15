// "use client"
import { LatLngExpression } from "leaflet";
import L from 'leaflet'

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon  } from "leaflet";

import 'leaflet/dist/leaflet.css'

interface MapProps {
  position?: number[];
  markerData?: string;
}

const Map: React.FC<MapProps> = ({ position, markerData }) => {
  return (
    <MapContainer
      center={(position as LatLngExpression) || [9.0192, 38.7525]}
      zoom={5}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position as LatLngExpression || [9.0192, 38.7525]} >
        <Popup>
            <div>Location from {markerData}</div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
