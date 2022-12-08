import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import swal from "sweetalert";

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

export default function AssetModal({ findAssetById }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [id, setId] = useState(null);
  const [coordinates, setCoordinates] = useState();

  useEffect(() => {
    coordinates &&
      swal({
        title: "Success",
        text: `Your co-ordinates are as follows- latitude: ${coordinates[0]} longitude: ${coordinates[1]}`,
        icon: "success",
      });
  }, [coordinates]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const helper = async () => {
    var lat, long;
    if (id != null) {
      const data = { id: id };
      await fetch(`http://localhost:5000/getAsset/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          const co_array = JSON.parse(data.borderCoordinates)[0];
          lat = co_array[0];
          long = co_array[1];
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    // const position = { selectPosition: { lat: lat, lon: long } };
    const position = { selectPosition: { lat: "80.0900323232", lon: "78.90394034" } };
    // console.log("pos : ", position);
    findAssetById(position);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" type="button" onClick={handleOpen}>
        Find property by ID
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
            <h2 id="transition-modal-title">Enter your property ID</h2>
            <p id="transition-modal-description">
              <TextField
                label="Enter property ID"
                variant="filled"
                onChange={(e) => {
                  setId(e.target.value);
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
