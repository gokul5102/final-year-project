import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import checkWhichRegionItLies from "./Maps.js";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const helper = () => {
    console.log(address);
    const options = {
      method: "GET",
      url: "https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi",
      params: { address: address },
      headers: {
        "X-RapidAPI-Key": "93a91c5481msh60191a114918ae1p137fa6jsn3b0d190e144d",
        "X-RapidAPI-Host": "address-from-to-latitude-longitude.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data?.Results[0]);
        if (response.data) {
          setCoordinates([
            response.data?.Results[0].latitude,
            response.data?.Results[0].longitude,
          ]);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        type="button"
        onClick={handleOpen}
      >
        Click here
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Enter your address</h2>
            <p id="transition-modal-description">
              <TextField
                label="Address"
                variant="filled"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </p>
            <Button color="primary" onClick={helper}>
              Find
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
