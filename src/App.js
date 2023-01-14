import { useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import AllCountries from "./components/AllCountries";
import CountryInfo from "./components/CountryInfo";
import "./css/all.min.css";
import "./css/bootstrap.min.css";
import "./css/normalize.css";
import "./css/style.css";

if (window.localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);

    document.querySelector(".up").addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    window.onscroll = () => {
      const endScroll = document.body.offsetHeight - window.innerHeight;
      if (
        window.scrollY > window.innerHeight &&
        window.scrollY < endScroll - 46
      ) {
        document.querySelector(".up").style.bottom = "10px";
      }
      if (window.scrollY > endScroll - 46) {
        document.querySelector(".up").style.bottom = "70px";
      }
      if (window.scrollY < window.innerHeight) {
        document.querySelector(".up").style.bottom = "-70px";
      }
    };
  }, []);
  return (
    <div className="App">
      <div className="up shad my-flex scale point">
        <i className="fas fa-arrow-up"></i>
      </div>
      <div className="face">
        <div className="logo-bg">
          <div className="svg-cont">
            <svg
              className="svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 560 560"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path
                    className="fill-sec"
                    d="M549.88,274.94c0,151.84-123.1,274.94-274.94,274.94S0,426.78,0,274.94,123.09,0,274.94,0,549.88,123.09,549.88,274.94ZM274.94,45.82C148.4,45.82,45.82,148.4,45.82,274.94S148.4,504.05,274.94,504.05,504.05,401.47,504.05,274.94,401.47,45.82,274.94,45.82Z"
                  />
                  <path
                    className="fill-sec"
                    d="M286.39,69.05C395,75,481.14,164.9,481.14,274.94S395,474.88,286.39,480.83m45.83-56a160.45,160.45,0,0,0,0-299.7M286.39,68.73v412m45.83-355.65v299.7"
                  />
                  <path
                    className="fill-sec"
                    d="M263.48,480.83a206.13,206.13,0,0,1-45.82-7.75V297.85H116.18a160.46,160.46,0,0,0,78.57,116V465a206.29,206.29,0,0,1,0-380.06V136a160.48,160.48,0,0,0-78.57,116H217.66V76.8h0a205.55,205.55,0,0,1,45.82-7.74h0V480.27"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div className="text">
            omar hassan
            <br />
            <span>developments</span>
          </div>
        </div>
      </div>
      <div className="logo-bg">
        <div className="svg-cont">
          <svg
            className="svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 560 560"
          >
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <path
                  className="fill-logo"
                  d="M549.88,274.94c0,151.84-123.1,274.94-274.94,274.94S0,426.78,0,274.94,123.09,0,274.94,0,549.88,123.09,549.88,274.94ZM274.94,45.82C148.4,45.82,45.82,148.4,45.82,274.94S148.4,504.05,274.94,504.05,504.05,401.47,504.05,274.94,401.47,45.82,274.94,45.82Z"
                />
                <path
                  className="fill-logo"
                  d="M286.39,69.05C395,75,481.14,164.9,481.14,274.94S395,474.88,286.39,480.83m45.83-56a160.45,160.45,0,0,0,0-299.7M286.39,68.73v412m45.83-355.65v299.7"
                />
                <path
                  className="fill-logo"
                  d="M263.48,480.83a206.13,206.13,0,0,1-45.82-7.75V297.85H116.18a160.46,160.46,0,0,0,78.57,116V465a206.29,206.29,0,0,1,0-380.06V136a160.48,160.48,0,0,0-78.57,116H217.66V76.8h0a205.55,205.55,0,0,1,45.82-7.74h0V480.27"
                />
              </g>
            </g>
          </svg>
        </div>
        <div className="text">
          omar hassan
          <br />
          <span>developments</span>
        </div>
      </div>
      <header className="pt-4 pb-4 bg2 shad ">
        <div className="container my-flex gap-2 justify-content-between">
          <Link className="d-flex gap-2 align-items-center" to="/">
            <i className="fas fa-home bg p-2 scale br shad"></i>
            <h5 className="m-0 fw-bold text-capitalize">Where In the world?</h5>
          </Link>
          <div
            onClick={(e) => {
              document.body.classList.toggle("light");
              if (document.body.classList.contains("light")) {
                window.localStorage.setItem("theme", "light");
                document.querySelector(".themetxt").innerHTML = "Dark Mode";
                document.querySelector(".theme").className =
                  "fas fa-moon theme";
              } else {
                window.localStorage.setItem("theme", "dark");
                document.querySelector(".themetxt").innerHTML = "Light Mode";
                document.querySelector(".theme").className = "fas fa-sun theme";
              }
            }}
            className="mode d-flex gap-2 align-items-center theme-cont"
          >
            <i className="fas fa-moon theme"></i>
            <span className="themetxt">Light Mode</span>
          </div>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<AllCountries />} />
        <Route path="/country/:countryName" element={<CountryInfo />} />
      </Routes>
    </div>
  );
}

export default App;
