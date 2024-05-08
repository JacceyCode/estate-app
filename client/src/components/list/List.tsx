import "./list.scss";
import Card from "../card/Card";
import { UserPostProp } from "../../types/data";

const List = ({ posts }: { posts: UserPostProp[] }) => {
  return (
    <section className="list">
      {posts.map((item) => (
        <Card item={item} key={item.id} />
      ))}
    </section>
  );
};

export default List;
