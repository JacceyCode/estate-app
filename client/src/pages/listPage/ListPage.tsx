import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Data, ListDataProp } from "../../types/data";

const ListPage = () => {
  const data = useLoaderData() as ListDataProp;

  return (
    <section className="listPage">
      <section className="listContainer">
        <div className="wrapper">
          <Filter />

          <Suspense fallback={<p>Loading data...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts...</p>}
            >
              {(postResponse) =>
                postResponse.data.map((post: Data) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </section>

      <section className="mapContainer">
        <Suspense fallback={<p>Loading data...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts...</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </section>
    </section>
  );
};

export default ListPage;
