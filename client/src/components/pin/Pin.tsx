import { Link } from "react-router-dom";
import { Marker, Popup } from "react-leaflet";
import { CardProp } from "../../types/data";
import "./pin.scss";
import { LatLngExpression } from "leaflet";

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
