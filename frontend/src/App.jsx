import React, { useEffect, useMemo, useState } from "react";
import "./input.css";
import Sign from "./components/sign/Sign";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./routes/RequiredAuth";
import axios from "axios";
import Home from "./components/home/Home";
import { io } from "socket.io-client";
import { createContext } from "react";
import defaultImage from "../src/images/default profile image.jpg";
import { sendAxiosRequest } from "./components/Request";
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const [imageURL, setImageURL] = useState("");
  console.log("user is ", user);
  useEffect(() => {
    console.log(user);
    async function uploadImage(userId) {
      const file = await sendAxiosRequest("GET", `profileimage/${userId}`);
      return file;
      // setImageURL(URL.createObjectURL(file));
    }
    if (user?.image) {
      uploadImage(user.userId).then((data) =>
        setImageURL(URL.createObjectURL(data.data))
      );
    } else {
      setImageURL(defaultImage);
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user: [user, setUser],
        image: [imageURL, setImageURL],
        socket: [socket, setSocket],
        connected: [connected, setConnected],
      }}
    >
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

  // <h1
  //   onClick={async () => {
  //     try {
  //       const res = await axios.get("http://localhost:3006/", {
  //         name: "ilyass",
  //       });
  //       console.log(res);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //     console.log("here");
  //   }}
  // >
  //   // click //
  // </h1>
  // <div>
  //   <form
  //     onSubmit={async (e) => {
  //       e.preventDefault();
  //       if (!selectedFiles) {
  //         console.log("No file selected.");
  //         return;
  //       }
  //       const formData = new FormData();
  //       //formData.append("file", selectedFile); for one file
  //       Object.keys(selectedFiles).forEach((key) => {
  //         formData.append(
  //           selectedFiles.item(key).name,
  //           selectedFiles.item(key)
  //         );
  //       });
  //       const res = await axios.post(
  //         "http://localhost:3006/upload",
  //         formData
  //       );
  //       console.log(res);
  //     }}
  //   >
  //     <input type="file" onChange={handleChange} name="file" multiple />
  //     <button>Submit</button>
  //   </form>

  //   <button
  //     onClick={async () => {
  //       const res = await axios.get("http://localhost:3006/files", {
  //         responseType: "blob", // Set the response type to blob
  //       });
  //       const blob = res.data;
  //       const imageURL = URL.createObjectURL(blob);
  //       console.log(imageURL);
  //       setImageURL(imageURL);
  //     }}
  //   >
  //     Get file
  //   </button>
  //   <img src={imageURL} alt="" />
  // </div>
  // );
}

export default App;
