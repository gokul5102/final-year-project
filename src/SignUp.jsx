import { useNavigate } from "react-router-dom";
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
      width: "35ch",
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SignUp() {
  const navigate = useNavigate();

  const classes = useStyles();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const anoRef = useRef();

  const paperStyle = {
    padding: 20,
    height: "58vh",
    width: 400,
    margin: "100px auto",
  };

  const btnstyle = { margin: "20px 20px", width: "290px" };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "userData",
      JSON.stringify({
        name: nameRef.current.value,
        email: emailRef.current.value,
        ano: anoRef.current.value,
        password: passwordRef.current.value,
      })
    );
    navigate("/map");
  };
  return (
    <div>
      <Navbar />
      <Grid>
        <Paper elevation={10} style={paperStyle} className={classes.root}>
          <Grid align="center">
            <h2>Signup Form</h2>
          </Grid>
          <TextField
            align="center"
            id="outlined-basic"
            label="name"
            variant="outlined"
            required
            inputRef={nameRef}
          />
          <TextField
            id="outlined-basic"
            label="email"
            variant="outlined"
            type="email"
            required
            inputRef={emailRef}
          />
          <TextField
            id="outlined-basic"
            label="password"
            variant="outlined"
            type="password"
            required
            inputRef={passwordRef}
          />
          <TextField
            id="outlined-basic"
            label="aadhaar number"
            variant="outlined"
            required
            inputRef={anoRef}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={handleSubmit}
          >
            SignUp
          </Button>
        </Paper>
      </Grid>
    </div>
  );
}
