import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import WarsztatApp from "../warsztat/src/App";
import KlientApp from "../klient/App";

function App() {
  const [userType, setUserType] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            userType ? (
              userType === "warsztat" ? (
                <Navigate to="/warsztat" />
              ) : (
                <Navigate to="/klient" />
              )
            ) : (
              <Login setUserType={setUserType} />
            )
          }
        />
        <Route path="/warsztat/*" element={<WarsztatApp />} />
        <Route path="/klient/*" element={<KlientApp />} />
      </Routes>
    </Router>
  );
}

export default App;
