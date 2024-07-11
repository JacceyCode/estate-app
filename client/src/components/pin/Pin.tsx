import { Link } from "react-router-dom";
import { Marker, Popup } from "react-leaflet";
import { CardProp } from "../../types/data";
import "./pin.scss";
import L, { LatLngExpression } from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const Pin = ({ item }: CardProp) => {
  const position: LatLngExpression = [+item.latitude, +item.longitude];

  return (
    <Marker position={position}>
      <Popup>
        <div className="popupContainer">
          <img src={item.images[0]} alt={item.title} />

          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom(s)</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default Pin;
