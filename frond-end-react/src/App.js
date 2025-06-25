import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MojeNaprawy from "./components/MojeNaprawy";
import './styles/style.css';
import './styles/styles1.css';
import './styles/main.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MojeNaprawy />} />
        <Route path="/moje-naprawy" element={<MojeNaprawy />} />
      </Routes>
    </Router>
  );
}

export default App;
