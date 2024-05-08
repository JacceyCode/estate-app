import { Link } from "react-router-dom";
import { Marker, Popup } from "react-leaflet";
import { CardProp } from "../../types/data";
import "./pin.scss";

const Pin = ({ item }: CardProp) => {
  return (
    <Marker position={[+item.latitude, +item.longitude]}>
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
