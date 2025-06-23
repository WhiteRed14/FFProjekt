import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StronaGlowna from "./components/StronaGlowna";
import MojeNaprawy from "./components/MojeNaprawy";
import Regulamin from "./components/Regulamin";
import NoweZlecenie from "./components/NoweZlecenie";
import './App.css';
import './styles/style.css';
import './styles/styles1.css';
import './styles/main.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StronaGlowna />} />
        <Route path="/moje-naprawy" element={<MojeNaprawy />} />
        <Route path="/regulamin" element={<Regulamin />} />
        <Route path="/nowe-zlecenie" element={<NoweZlecenie />} />
      </Routes>
    </Router>
  );
}

export default App;
