import React, { useState } from "react";
import SearchBox from "./SearchBox";
import Maps from "./Maps";

import DrawMap from "./DrawMap";
const MapPage = () => {
  const [selectPosition, setSelectPosition] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ width: "50vw", height: "100vh" }}>
        <Maps selectPosition={selectPosition} setSelectPosition={setSelectPosition} />

        {/* <DrawMap /> */}
      </div>
      <div style={{ border: "2px solid red", width: "50vw" }}>
        <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
      </div>
    </div>
  );
};

export default MapPage;
