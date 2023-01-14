import React, { useEffect, useState } from "react";
import { api } from "../util/api";
import { Link } from "react-router-dom";

const Borders = ({ count }) => {
  const [borders, setBorders] = useState([]);

  useEffect(() => {
    async function getData() {
      if (count.borders) {
        count.borders = count.borders.filter((border) => border !== "ISR");
        let arr = await Promise.all(
          count.borders.map(async (border) => {
            const res = await fetch(`${api}/alpha/${border}`);
            const data = await res.json();
            return data[0].name.common;
          })
        );
        setBorders(arr);
      }
    }
    getData();
  }, [count]);
  return (
    <div className="borders mt-4 fw-bold fs-5">
      {borders.length
        ? borders.map((border) => (
            <button className="mb-5">
              <Link
                className="p-3 bg2 shad br fs-6 me-3 fw-600"
                to={`/country/${border}`}
              >
                {border}
              </Link>
            </button>
          ))
        : "This Country Has No Border Countries."}
    </div>
  );
};

export default Borders;
