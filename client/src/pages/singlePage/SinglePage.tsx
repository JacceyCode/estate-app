import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import { singlePostData, userData } from "../../data/dummydata";
import Map from "../../components/map/Map";

const SinglePage = () => {
  return (
    <section className="singlePage">
      <section className="details">
        <section className="wrapper">
          <Slider images={singlePostData.images} />

          <article className="info">
            <section className="top">
              <section className="post">
                <h1>{singlePostData.title}</h1>

                <div className="address">
                  <img src="/pin.png" alt="Location icon" />
                  <span>{singlePostData.address}</span>
                </div>

                <div className="price">$ {singlePostData.price}</div>
              </section>

              <section className="user">
                <img src={userData.img} alt={userData.name} />
                <span>{userData.name}</span>
              </section>
            </section>

            <section className="bottom">{singlePostData.description}</section>
          </article>
        </section>
      </section>

      <section className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="utility icon" />
              <div className="featureText">
                <span>Utilities</span>
                <p>Renter is responsible</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="pet icon" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>Pets Allowed</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="cash icon" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>Must have 3x the rent in total household income</p>
              </div>
            </div>
          </div>

          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="icon" />
              <span>80 sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="icon" />
              <span>2 beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="icon" />
              <span>1 bathroom</span>
            </div>
          </div>

          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="school icon" />
              <div className="featureText">
                <span>School</span>
                <p>250m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="pet icon" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>100m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="cash icon" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>200m away</p>
              </div>
            </div>
          </div>

          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[singlePostData]} />
          </div>

          <div className="buttons">
            <button>
              <img src="/chat.png" alt="Message icon" />
              Send a Message
            </button>
            <button>
              <img src="/save.png" alt="Bookmark icon" />
              Save the Place
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default SinglePage;
