import React from "react";
import { Routes, Route } from "react-router-dom";
import MojeNaprawy from "./components/MojeNaprawy";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MojeNaprawy />} />
      <Route path="/" element={<MojeNaprawy />} />
    </Routes>
  );
}

export default App;
