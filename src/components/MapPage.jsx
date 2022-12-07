import React, { useState } from "react";
import SearchBox from "./SearchBox";
import Maps from "./Maps";
// import DrawMap from "./components/DrawMap";

const divStyles = {
  display: "flex",
  flexDirection: "row",
  width: "100vw",
  height: "100vh",
};

const MapPage = () => {
  const [selectPosition, setSelectPosition] = useState(null);
  return (
    <div style={divStyles}>
      <div style={{ width: "50vw", height: "100vh" }}>
        <Maps selectPosition={selectPosition} />
      </div>
      <div style={{ border: "2px solid red", width: "50vw" }}>
        <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
      </div>
    </div>
  );
};

export default MapPage;
