import { Link } from "react-router-dom";
import { CardProp } from "../../types/data";
import "./card.scss";

const Card = ({ item }: CardProp) => {
  return (
    <section className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt={`${item.title} image`} />
      </Link>

      <section className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>

        <p className="address">
          <img src="/pin.png" alt="Location icon" />
          <span>{item.address}</span>
        </p>

        <p className="price">$ {item.price}</p>

        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="Mattress image" />
              <span>{item.bedroom} bedroom(s)</span>
            </div>

            <div className="feature">
              <img src="/bath.png" alt="Mattress image" />
              <span>{item.bathroom} bathroom(s)</span>
            </div>
          </div>

          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="Bookmark icon" />
            </div>

            <div className="icon">
              <img src="/chat.png" alt="Message icon" />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Card;
