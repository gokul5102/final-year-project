import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
// import Link from "@mui/material/Link";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
    </>
  );
};

export default HomePage;
