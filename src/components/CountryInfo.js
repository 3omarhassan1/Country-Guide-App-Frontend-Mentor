import React, { useEffect, useState } from "react";
import { api } from "../util/api";
import { useParams, useNavigate } from "react-router-dom";
import Borders from "./Borders";

const CountryInfo = () => {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [cur, setCur] = useState("");
  const [name, setName] = useState("");
  const [lang, setLang] = useState("");
  const { countryName } = useParams();
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  let count;

  const getCountryByName = async () => {
    try {
      const res = await fetch(`${api}/name/${countryName}?fullText=true`);
      if (!res.ok) throw new Error("Couldn't be found!");
      const data = await res.json();
      data.length = 1;
      setCountry(data);
      count = data[0];
      console.log(count);
      console.log(Object.keys(count.coatOfArms).length);

      setCur(Object.values(data[0].currencies)[0]);
      setName(Object.values(data[0].name.nativeName)[0]);
      setLang(data[0].languages);
      setIsLoading(false);
      setError("");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  window.scrollTo(0, 0);
  useEffect(() => {
    getCountryByName();
  }, [countryName]);

  return (
    <div className="CountryInfo">
      <div className="container ">
        <button
          className="bg p-3 ps-4 pe-4 bg2 mt-5 shad br d-flex gap-3 align-items-center"
          onClick={back}
        >
          <i className="fas fa-arrow-left"></i>
          Back
        </button>
        {isLoading && !error && <h4 className="mt-4">Loading...</h4>}
        {!isLoading && error && <h4 className="mt-4">{error}</h4>}
        {country?.map((count, index) => (
          <div className="cont mt-5 d-flex flex-column flex-lg-row align-items-md-start gap-5">
            <div className="visual d-flex flex-column align-items-sm-stretch gap-4">
              <img
                src={count.flags.svg}
                alt={`${count.name.common} Flag`}
                className="br"
              />
              <button className="p-3 bg2 shad br fs-5 fw-normal">
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={count.maps.googleMaps}
                >
                  View in Google Maps
                </a>
              </button>
            </div>
            <div className="info ps-2 p-md-0 flex-grow-1">
              <h1 className="fw-bold mb-4">{count.name.common}</h1>
              <div
                style={{
                  gap: "4rem",
                }}
                className="data d-flex justify-content-betwen flex-column flex-md-row"
              >
                <div className="data1 d-flex flex-column gap-2">
                  <div className="box">
                    <p style={{}} className="fw-normal text-capitalize">
                      official name:
                      <span className="fw-bold d-block mt-2 fs-5">
                        {count.name.official}
                      </span>
                    </p>
                  </div>
                  <div className="box">
                    <p style={{}} className="fw-normal text-capitalize">
                      native name:
                      <span className="fw-bold d-block mt-2 fs-5">
                        {name.official}
                      </span>
                    </p>
                  </div>

                  <div className="box">
                    <p className="fw-normal text-capitalize">
                      {count.capital && count.capital.length > 1
                        ? "capitals:"
                        : "capital:"}

                      <span className="fw-bold ps-2 p-md-0 d-md-block mt-2 fs-5">
                        {count.capital
                          ? count.capital.join(", ")
                          : "Has No Capital"}
                      </span>
                    </p>
                  </div>

                  <div className="box">
                    <p className="fw-normal text-capitalize">
                      currency:
                      <span
                        style={{ whiteSpace: "inherit" }}
                        className="fw-bold ps-2 p-md-0 d-md-block mt-2 fs-5"
                      >
                        {cur.name} ({cur.symbol})
                      </span>
                    </p>
                  </div>

                  <div className="box">
                    <p className="fw-normal text-capitalize">
                      population:
                      <span className="fw-bold ps-2 p-md-0 d-md-block mt-2 fs-5">
                        {count.population.toLocaleString("en-US")}
                      </span>
                    </p>
                  </div>

                  <div className="box">
                    <p className="fw-normal text-capitalize">
                      area:
                      <span className="fw-bold ps-2 p-md-0 d-md-block mt-2 fs-5">
                        {count.area.toLocaleString("en-US")} Km<sup>2</sup>
                      </span>
                    </p>
                  </div>

                  <div className="box">
                    <p className="fw-normal text-capitalize">
                      {Object.values(lang).length > 1
                        ? "languages:"
                        : "language:"}

                      <span className="fw-bold ps-2 p-md-0 d-md-block mt-2 fs-5">
                        {Object.values(lang).join(", ")}
                      </span>
                    </p>
                  </div>

                  <div className="box">
                    <p className="fw-normal text-capitalize">
                      First day in the week:
                      <span className="fw-bold ps-2 p-md-0 d-md-block mt-2 fs-5">
                        {count.startOfWeek}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="data2 d-flex flex-column gap-2">
                  <div className="box">
                    <p className="fw-normal text-capitalize">
                      top level domain:
                      <span className="fw-bold ps-2 p-md-0 d-md-block mt-2 fs-5 text-lowercase">
                        {count.tld[0]}
                      </span>
                    </p>
                  </div>
                  <div className="box">
                    <p className="fw-normal text-capitalize">
                      region:
                      <span className="fw-bold ps-2 p-md-0 d-md-block mt-2 fs-5">
                        {count.region}
                      </span>
                    </p>
                  </div>

                  <div className="box">
                    <p className="fw-normal text-capitalize">
                      sub region:
                      <span className="fw-bold ps-2 p-md-0 d-md-block mt-2 fs-5">
                        {count.subregion}
                      </span>
                    </p>
                  </div>

                  <div className="box">
                    <p className="fw-normal text-capitalize">
                      United Nations status:
                      <span
                        style={{
                          whiteSpace: "inherit",
                        }}
                        className="fw-bold d-block mt-2 fs-5"
                      >
                        {count.unMember
                          ? "This country is a united nations member"
                          : "This country is NOT a united nations member"}
                      </span>
                    </p>
                  </div>

                  <div className="box">
                    <p className="fw-normal text-capitalize">
                      coat of arms:
                      <span className="fw-bold ps-2 p-md-0 d-md-block mt-3 fs-5">
                        {Object.keys(count.coatOfArms).length > 0 ? (
                          <img
                            style={{
                              marginTop: "1.5rem",
                            }}
                            width={150}
                            src={count.coatOfArms.svg}
                            alt={`${count.name.common} Coat Of Arms`}
                          />
                        ) : (
                          "This Country Has No Coat Of Arms"
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <p className="borders-cont gap-1 mt-5 fw-normal text-capitalize">
                Border Countries:
                <Borders count={count} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryInfo;
