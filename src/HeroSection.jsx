import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";
import "./App.css";

import icon from "./assets/icon2.png";

import "./HeroSection.css";

function HeroSection() {
  return (
    <div
      className="hero-container"
      style={{ backgroundColor: "rgb(67, 154, 151)" }}
    >
      {/* <video src="/videos/video-2.mp4" autoPlay loop muted /> */}
      {/* <img src={icon} alt="mohsin.jpg" /> */}
      {/* <h1>SUPER SAVIOURS</h1> */}
      <p>Welcome</p>
      <div className="hero-btns">
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: "15px", width: "`105px", height: "60px" }}
        >
          <Link
            to="/signup"
            style={{ textDecoration: "none", color: "white", fontSize: "1rem" }}
          >
            Map
          </Link>
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "15px", width: "105px", height: "60px" }}
        >
          <a
            href="http://localhost:30052/"
            style={{ textDecoration: "none", color: "white", fontSize: "1rem" }}
          >
            Data Query
          </a>
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
