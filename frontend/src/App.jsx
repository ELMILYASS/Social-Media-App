import React, { useState } from "react";
import "./input.css";
import Sign from "./components/sign/Sign";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./routes/RequiredAuth";
import axios from "axios";
import handleLogout from "./controllers/HandleLogout";

function App() {
  // axios.get("http://localhost:3006/").then((r) => console.log(r));
  
  return (
    <Router>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Sign />} />
          <Route
            path="/home"
            element={<h1 onClick={handleLogout}>Welcome Click to logout</h1>}
          />
        </Route>{" "}
      </Routes>
    </Router>
  );
}

export default App;
