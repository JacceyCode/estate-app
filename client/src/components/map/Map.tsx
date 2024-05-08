import "./map.scss";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapProp } from "../../types/data";
import Pin from "../pin/Pin";

const Map = ({ items }: MapProp) => {
  return (
    <MapContainer
      center={
        items.length === 1
          ? [+items[0].latitude, +items[0].longitude]
          : [52.4797, -1.90269]
      }
      zoom={6}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
};

export default Map;
