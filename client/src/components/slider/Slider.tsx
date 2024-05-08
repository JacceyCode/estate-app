import { useState } from "react";
import { SLiderProp } from "../../types/data";
import "./slider.scss";

const Slider = ({ images }: SLiderProp) => {
  const [imageIndex, setImageIndex] = useState<null | number>(null);

  const changeSlide = (direction: string) => {
    const imgLen = images.length;

    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(imgLen - 1);
      } else {
        setImageIndex(imageIndex! - 1);
      }
    } else {
      if (imageIndex === imgLen - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex! + 1);
      }
    }
  };

  return (
    <section className="slider">
      {imageIndex !== null && (
        <section className="fullSlider">
          <div className="arrow">
            <img
              src="/arrow.png"
              alt="Left arrow"
              onClick={() => changeSlide("left")}
            />
          </div>

          <div className="imgContainer">
            <img src={images[imageIndex]} alt="Apartment image" />
          </div>

          <div className="arrow">
            <img
              src="/arrow.png"
              className="right"
              alt="Right arrow"
              onClick={() => changeSlide("right")}
            />
          </div>

          <div className="close" onClick={() => setImageIndex(null)}>
            X
          </div>
        </section>
      )}

      <section className="bigImage">
        <img
          src={images[0]}
          alt="Apartment image"
          onClick={() => setImageIndex(0)}
        />
      </section>

      <section className="smallImages">
        {images.slice(1).map((image, index) => (
          <img
            src={image}
            key={index}
            alt="Apartment image"
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </section>
    </section>
  );
};

export default Slider;
