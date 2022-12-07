import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import MapPage from "./components/MapPage";
import SignUp from "./components/SignUp";
import RegisterLand from "./components/RegisterLand";

function App() {
  const [selectPosition, setSelectPosition] = useState(null);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/map" element={<MapPage />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/registerLand" element={<RegisterLand />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
