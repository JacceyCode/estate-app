import { ChangeEvent, useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const types = ["buy", "rent"];

  const switchType = (val: string) => setQuery({ ...query, type: val });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
        <input
          type="text"
          name="location"
          placeholder="City Location"
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrrice"
          placeholder="Min Price"
          min={0}
          max={10000000}
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          min={0}
          max={10000000}
          onChange={handleChange}
        />

        <Link
          to={`/list?type=${query.type}&city=${query.location}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
        >
          <button type="submit">
            <img src="/search.png" alt="Search icon" />
          </button>
        </Link>
      </form>
    </section>
  );
};

export default SearchBar;
