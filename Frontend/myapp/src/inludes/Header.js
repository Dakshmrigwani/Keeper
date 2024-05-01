import React, { useContext, useState, useEffect } from "react";
import keep from "../keep-img.png";
import { FaGoogle } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import { MdLogout } from "react-icons/md";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { ThemeContext } from "../Context/ThemeContext";
import { FilteredDataContext } from "../Context/FilteredDataContext";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function Header({
  setInputClicked,
  setFilterClicked,
  handleOutsideClick,
}) {
  const { user, loginWithRedirect , isAuthenticated , logout } = useAuth0();
console.log("current user" , user);
  const [isActive, setIsActive] = useState(false);
  const { setFilteredData, filteredData } = useContext(FilteredDataContext);
  const FilteredArray = useSelector((state) => state.note.FilteredArray);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    console.log(filteredData);
  }, [filteredData]);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleClick = () => {
    setIsActive(!isActive); // Toggle isActive state
  };

  const handleSearch = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchQuery(inputValue);

    // Check if FilteredArray is defined and is an array
    if (Array.isArray(filteredData)) {
      // Filter products only if FilteredArray is an array
      const filteredProducts = filteredData.filter(
        (product) =>
          // Check if product.text is defined before calling toLowerCase
          product.text && product.text.toLowerCase().includes(inputValue)
      );
      setFilteredData(filteredProducts);
    }
  };
  console.log(searchQuery);

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg" sticky="top">
        <div className="container-fluid">
          <div className="d-flex flex-row justify-content-between w-100  align-items-center gap-2">
            <div className="d-flex flex-row gap-2 align-items-center">
              <a className="navbar-brand me-0" href="#">
                <img src={keep} alt="Keep Logo" />
              </a>
              <span>
                <h4 className="text-dark title">KEEPER</h4>
              </span>
            </div>
            <div className="d-flex justify-content-center align-items-center w-100">
              <div className="position-relative relhover">
                <input
                  className={`form-control searchbar py-lg-2  ${
                    isActive ? "full-mobile" : ""
                  }`}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearch}
                  onClick={() => {
                    handleClick();
                    setInputClicked(true);
                    setFilterClicked(false);
                  }}
                />
                <div
                  className="position-absolute crossicn"
                  onClick={() => {
                    handleClick();
                    setInputClicked(false);
                    setFilterClicked(true);
                  }}
                >
                  x
                </div>
              </div>
            </div>
            <div className="">
              <div className="d-flex flex-row gap-3 justify-content-end w-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-arrow-clockwise"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                  />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-columns-gap"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 1v3H1V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm14 12v3h-5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM6 8v7H1V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm14-6v7h-5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-gear"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                </svg>
                {isAuthenticated ? (
                  <div class="d-flex flex-row gap-1">
                    <img
                      src={user.picture}
                      alt="userimage"
                      className="profiledata"
                    />

                    <a onClick={logout}><MdLogout className="fs-3"/></a>
                  </div>
                ) : (
                  <span onClick={(e) => loginWithRedirect()}>
                    <FaGoogle size={"24px"} />{" "}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="icons">
        <div className="query">
          <div className="card border-0 shadow-lg">
            <div className="card-body">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-question-lg"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="mode">
          <div
            className="card border-0 shadow-lg"
            onClick={toggleTheme}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body">
              {theme === "dark-theme" ? (
                <BsFillSunFill size={"20px"} />
              ) : (
                <BsMoonFill size={"20px"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
