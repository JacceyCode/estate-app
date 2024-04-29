import { listData } from "../../data/dummydata";
import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";

const ListPage = () => {
  const data = listData;

  return (
    <section className="listPage">
      <section className="listContainer">
        <div className="wrapper">
          <Filter />

          {data.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="mapContainer">
        <Map items={data} />
      </section>
    </section>
  );
};

export default ListPage;
