import React, { useState } from "react";

import { Link } from "react-router-dom";
import "./Navbar.css";
// import { Button } from "@material-ui/core";
import icon from "./assets/icon1.png";

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dropdown1, setDropdown1] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const onMouseEnter1 = () => {
    if (window.innerWidth < 960) {
      setDropdown1(false);
    } else {
      setDropdown1(true);
    }
  };

  const onMouseLeave1 = () => {
    if (window.innerWidth < 960) {
      setDropdown1(false);
    } else {
      setDropdown1(false);
    }
  };

  return (
    <>
      <nav className="navbar" style={{ position: "sticky", top: "0" }}>
        {/* <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img className="navbar-img" src={icon} alt="mohsin.jpg" />
        </Link> */}

        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          Land Registry
          <i className="fab fa-firstdraft" />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/signup" className="nav-links" onClick={closeMobileMenu}>
              Map
            </Link>
          </li>
          <li
            className="nav-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <a
              href="http://localhost:30052/"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "1.2rem",
              }}
            >
              Data Query <i className="fas fa-caret-down" />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
