import React, { useState } from "react";
import SearchBox from "./SearchBox";
import Maps from "./Maps";
import MapPage from "./MapPage";
import DrawMap from "./DrawMap";
import HomePage from "./HomePage";
import SignUp from "./SignUp";
import RegisterLand from "./RegisterLand";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const [selectPosition, setSelectPosition] = useState(null);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/map" element={<MapPage />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/registerLand" element={<RegisterLand />} />
      </Routes>
    </Router>
  );
}

export default App;
