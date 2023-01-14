import React, { useEffect, useState } from "react";
import { api } from "../util/api";
import { Link } from "react-router-dom";

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const [region, setRegion] = useState("");

  const getCountries = async () => {
    try {
      let res = "";
      let data = [];
      if (input && region) {
        res = await fetch(`${api}/name/${input}`);
        data = await res.json();
        if (data && data.constructor === Array) {
          data = data.filter(
            (count) => count.region === region && count.name.common !== "Israel"
          );
        }
        if (!res.ok) throw new Error("There is no country with this name.");
        if (data.length === 0)
          throw new Error("There is no country with this name in this region.");
      }
      if (input && !region) {
        res = await fetch(`${api}/name/${input}`);
        if (!res.ok) throw new Error("There is no country with this name.");
        data = await res.json();
        data = data.filter((count) => count.name.common !== "Israel");
      }
      if (!input && region) {
        const res = await fetch(`${api}/region/${region}`);
        if (!res.ok) throw new Error("Something went wrong!");
        data = await res.json();
        data = data.filter((count) => count.name.common !== "Israel");
      }
      if (!input && !region) {
        res = await fetch(`${api}/all`);
        if (!res.ok) throw new Error("Something went wrong!");
        data = await res.json();
        data = data.filter((count) => count.name.common !== "Israel");
      }
      setCountries(data);
      console.log(data);
      setIsLoading(false);
      setError("");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      setCountries([]);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCountries();
  }, [input, region]);

  return (
    <div className="AllCountries">
      <div className="bar pt-4 pb-4">
        <div className="container d-flex justify-content-between flex-wrap gap-4">
          <form className="col-md-6 col-sm-12 d-flex">
            <input
              type="text"
              className="bg2 br p-3 ps-5 w-100 shad"
              placeholder="Search..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </form>
          <select
            className="bg2 text br p-3  shad"
            name="cont"
            id="cont"
            onChange={(e) => {
              setRegion(e.target.value);
            }}
          >
            <option className="p-2" value="">
              Filter by Region
            </option>
            <option className="p-2" value="Africa">
              Africa
            </option>
            <option className="p-2" value="America">
              Americas
            </option>
            <option className="p-2" value="Asia">
              Asia
            </option>
            <option className="p-2" value="Europe">
              Europe
            </option>
            <option className="p-2" value="Oceania">
              Oceania
            </option>
          </select>
        </div>
      </div>
      <div className="content">
        <div className="error">
          <div className="container">
            {isLoading && !error && <h4>Loading...</h4>}
            {!isLoading && error && <h4>{error}</h4>}
          </div>
        </div>
        <div className="counts container">
          {countries?.map((count, index) => {
            return (
              <Link to={`/country/${count.name.common}`}>
                <div className="count-card shad overflow-hidden bg2 br d-flex flex-column justify-content-between h-100">
                  <img
                    src={count.flags.png}
                    alt={`${count.name.common} Flag`}
                  />
                  <div className="data p-4 pb-5">
                    <h5 className="fw-bolder mb-4 mt-auto">
                      {count.name.common}
                    </h5>
                    <div className="box">
                      <p className="mb-1 fw-600 text-capitalize">
                        population:
                        <span className="fw-300">
                          {" "}
                          {count.population.toLocaleString("en-US")}
                        </span>
                      </p>
                    </div>
                    <div className="box">
                      <p className="mb-1 fw-600 text-capitalize">
                        region:
                        <span className="fw-300"> {count.region}</span>
                      </p>
                    </div>
                    <div className="box">
                      <p className="mb-1 fw-600 text-capitalize">
                        {count.capital && count.capital.length > 1
                          ? "capitals"
                          : "capital"}
                        :
                        <span className="fw-300">
                          {" "}
                          {count.capital
                            ? count.capital.join(", ")
                            : "Has No Capital"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllCountries;
