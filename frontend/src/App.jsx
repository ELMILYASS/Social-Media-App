import React, { useEffect, useState } from "react";
import "./input.css";
import Sign from "./components/sign/Sign";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./routes/RequiredAuth";

import Home from "./components/home/Home";
import { io } from "socket.io-client";
import { createContext } from "react";
export const UserContext = createContext();
function App() {
  // shadow-[0_10px_30px_rgb(0,0,0,0.2)]
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Sign />} />
            <Route path="/home/*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
