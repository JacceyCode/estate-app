import { useState } from "react";
import "./searchBar.scss";

const SearchBar = () => {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const types = ["buy", "rent"];

  const switchType = (val: string) => setQuery({ ...query, type: val });

  return (
    <section className="searchBar">
      <div className="type">
        {types.map((type, index) => (
          <button
            key={index}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>

      <form>
        <input type="text" name="location" placeholder="City Location" />
        <input
          type="number"
          name="minPrrice"
          placeholder="Min Price"
          min={0}
          max={10000000}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          min={0}
          max={10000000}
        />

        <button type="submit">
          <img src="/search.png" alt="Search icon" />
        </button>
      </form>
    </section>
  );
};

export default SearchBar;
