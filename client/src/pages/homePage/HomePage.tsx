import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";

const HomePage = () => {
  return (
    <section className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione,
            nihil adipisci consequuntur ipsa qui impedit consectetur iure est
            minima? Sint officiis tempore magnam odit quia, possimus sit aperiam
            quo ut?
          </p>

          <SearchBar />

          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Properties Ready</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="imgContainer">
        <img src="/bg.png" alt="House images" />
      </div>
    </section>
  );
};

export default HomePage;
