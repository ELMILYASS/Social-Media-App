import React, { useState } from "react";
import "./input.css";
import Sign from "./components/sign/Sign";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./routes/RequiredAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Sign />} />
          <Route path="/home" element={<h1>Welcome</h1>} />
        </Route>{" "}
      </Routes>
    </Router>
  );
}

export default App;
