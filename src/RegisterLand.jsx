import React, { useState } from "react";

const RegisterLand = () => {
  const [assetId, setAssetId] = useState("");
  const [value, setValue] = useState("");
  const [formValues, setFormValues] = useState([{ lat: "", long: "" }]);

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
      <form onSubmit={handleSubmit}>
        <br />
        <label>
          Enter id for the property: &nbsp;&nbsp; <input type="text" value={assetId} onChange={(e) => setAssetId(e.target.value)} />
        </label>

        <br />
        <br />
        <label>
          Enter appraised value of the property: &nbsp;&nbsp; <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        </label>

        <br />
        <br />

        {formValues.map((element, index) => (
          <div className="form-inline" key={index}>
            <label>Latitude: &nbsp;&nbsp;</label>
            <input type="text" name="lat" value={element.lat || ""} onChange={(e) => handleChange(index, e)} />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label>Longitude: &nbsp;&nbsp;</label>
            <input type="text" name="long" value={element.long || ""} onChange={(e) => handleChange(index, e)} />
            &nbsp;&nbsp;&nbsp;&nbsp;
            {index ? (
              <button type="button" className="button remove" onClick={() => removeFormFields(index)}>
                Remove
              </button>
            ) : null}
          </div>
        ))}
        <br />
        <br />
        <div className="button-section">
          <button className="button add" type="button" onClick={() => addFormFields()}>
            Add
          </button>
          &nbsp;&nbsp;
          <button className="button submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterLand;
