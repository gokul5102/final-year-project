import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";

import Navbar from "./Navbar";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "60ch",
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const RegisterLand = () => {
  const classes = useStyles();
  const [assetId, setAssetId] = useState("");
  const [value, setValue] = useState("");
  const [formValues, setFormValues] = useState([{ lat: "", long: "" }]);
  const paperStyle = {
    padding: 20,
    height: "78vh",
    width: 600,
    margin: "75px auto",
  };

  const btnstyle = { margin: "20px 20px", width: "390px" };

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { lat: "", long: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();

    const userData = JSON.parse(localStorage.getItem("userData"));
    const owner = userData.name;

    const coordinates = [];
    for (let i = 0; i < formValues.length; i++) {
      const latitude = parseFloat(formValues[i].lat);
      const longitude = parseFloat(formValues[i].long);
      coordinates.push([latitude, longitude]);
    }

    const data = {
      id: assetId,
      borderCoordinates: coordinates,
      owner: owner,
      appraisedValue: value,
    };

    // console.log(data);
    fetch("http://localhost:5000/createAsset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // setCoordinates([]);
  };

  return (
    <div>
      <Navbar />
      <Grid>
        <Paper elevation={10} style={paperStyle} className={classes.root}>
          <Grid align="center">
            <h2>Register Land Form</h2>
          </Grid>
          <TextField
            align="center"
            id="outlined-basic"
            label="Property Id"
            variant="outlined"
            required
            value={assetId}
            onChange={(e) => setAssetId(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Property's appraised value"
            variant="outlined"
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {formValues.map((element, index) => (
            <div
              className="form-inline"
              key={index}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <TextField
                id="outlined-basic"
                label="Latitude"
                variant="outlined"
                name="lat"
                required
                value={element.lat || ""}
                onChange={(e) => handleChange(index, e)}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <TextField
                id="outlined-basic"
                label="Longitude"
                variant="outlined"
                required
                name="long"
                value={element.long || ""}
                onChange={(e) => handleChange(index, e)}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              {index ? (
                <Button
                  type="button"
                  color="secondary"
                  className="button remove"
                  variant="contained"
                  style={{ width: "175px", height: "50px" }}
                  fullWidth
                  onClick={() => removeFormFields(index)}
                >
                  Remove
                </Button>
              ) : null}
            </div>
          ))}
          <div className="button-section">
            <Button
              type="button"
              className="button add"
              color="primary"
              variant="contained"
              // style={btnstyle}
              fullWidth
              onClick={() => addFormFields()}
            >
              Add
            </Button>
            &nbsp;&nbsp;
            <Button
              className="button submit"
              type="submit"
              color="primary"
              variant="contained"
              // style={btnstyle}
              fullWidth
            >
              Submit
            </Button>
          </div>
        </Paper>
      </Grid>
    </div>
  );
};

export default RegisterLand;
