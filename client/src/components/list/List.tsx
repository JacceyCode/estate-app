import "./list.scss";
import { listData } from "../../data/dummydata";
import Card from "../card/Card";

const List = () => {
  return (
    <section className="list">
      {listData.map((item) => (
        <Card item={item} key={item.id} />
      ))}
    </section>
  );
};

export default List;
