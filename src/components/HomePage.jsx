import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
// import Link from "@mui/material/Link";

const HomePage = () => {
  return (
    <div>
      <Button variant="contained" color="secondary" type="button">
        <Link to="/signup">Map</Link>
      </Button>
      <Button variant="contained" color="primary" type="button">
        <a href="http://localhost:30052/">Data Query</a>
      </Button>
    </div>
  );
};

export default HomePage;
