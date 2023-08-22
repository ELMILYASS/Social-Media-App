import React, { useContext, useState } from "react";
import img from "../../../Images/pexels-pixabay-220453.jpg";
import {
  AiOutlineCamera,
  AiOutlineVideoCamera,
  AiOutlinePlus,
} from "react-icons/ai";
import { GrFormAdd } from "react-icons/gr";
import PostIcon from "./PostIcon";
import { UserContext } from "../../../../App";
import { sendAxiosRequest } from "../../../Request";
import File from "./File";

function UserPost() {
  const [user, setUser] = useContext(UserContext).user;
  const [socket, setSocket] = useContext(UserContext).socket;
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [imageURL, setImageURL] = useContext(UserContext).image;
  const [warning, setWarning] = useState("");
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  const [notAllowedFiles, setNotAllowedFiles] = useState([]);
  const [textContent, setTextContent] = useState("");
  const [changeAddPost, setChangeAddPost] =
    useContext(UserContext).changedAddedPost;
  function changeContent(e) {
    setTextContent(e.target.value);
  }
  const styles = {
    opacity: saved ? "1" : "0",
    zIndex: saved ? "1" : "-1",
  };
  function onChange(e) {
    const images = e.target.files;

    let displayedFiles = [];
    let newFiles = [];
    for (let i = 0; i < images.length; i++) {
      displayedFiles.push({
        name: images[i].name,

        img: URL.createObjectURL(images[i]),
      });
      newFiles.push(images[i]);
    }
    setFiles(newFiles);
    setUploadedFiles(displayedFiles);
  }

  function addImage(e) {
    const images = e.target.files;
    let newFiles = [...files];
    let displayedFiles = [...uploadedFiles];
    for (let i = 0; i < images.length; i++) {
      displayedFiles.push({
        name: images[i].name,
        img: URL.createObjectURL(images[i]),
      });
      newFiles.push(images[i]);
    }
    setFiles(newFiles);
    setUploadedFiles(displayedFiles);
  }
  async function sharePost(e) {
    e.preventDefault();
    const content = textContent.trim();

    const images = files;

    // const videos = e.target.videos.files;

    if (!content && images.length === 0) {
      setWarning("Impossible to share an empty post");

      setTimeout(() => {
        setWarning("");
      }, 1500);
    } else {
      const formData = new FormData();
      formData.append("userId", user.userId);
      formData.append("content", content);

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      // for (let i = 0; i < videos.length; i++) {
      //   formData.append("videos", videos[i]);
      // }

      try {
        const res = await sendAxiosRequest("POST", "post", formData);
        console.log("result is ", res);
        setWarning("");
        setShared(true);
        setChangeAddPost((prev) => !prev);
        setTimeout(() => {
          setSaved(true);
        }, 50);

        setTimeout(() => {
          setSaved(false);
          setTimeout(() => {
            setShared(false);
          }, 200);
        }, 1500);
        setTimeout(() => {
          setTextContent("");
          setFiles([]);
          setUploadedFiles([]);
        }, 1500);

        socket.emit("add-post", user.userId);
      } catch (err) {
        if (err.response.status === 402) {
          const notAllowedFiles = err.response.data.notAllowedFiles;
          console.log(notAllowedFiles);

          setNotAllowedFiles(notAllowedFiles);
        }
        console.log(err);
        setWarning(err.response.data.message);
      }
    }
  }
  const [isDark, setIsDark] = useContext(UserContext).isDark;
  return (
    <div
      style={{
        backgroundColor: isDark ? "var(--darkSecond)" : "",
        borderColor: isDark ? "rgb(38,38,38)" : "var(--gray)",
      }}
      className="bg-white  border-[1px] border-gray hover:shadow-[0_10px_30px_rgb(0,0,0,0.2)] duration-[0.3s] p-4 min-h-[150px] w-full rounded-xl"
    >
      {warning && (
        <div className="text-center py-1 max-h-[120px] text-red-700 overflow-auto">
          {warning}{" "}
        </div>
      )}
      {shared && (
        <div style={styles} className="text-main text-center duration-[0.3s]">
          Saved Well
        </div>
      )}
      <form onSubmit={sharePost}>
        <div className="w-full h-[80px] flex  mb-5">
          <img
            src={imageURL}
            alt="image"
            className="h-[50px] w-[50px] mr-3 rounded-full object-cover "
          />
          <textarea
            style={{
              backgroundColor: isDark ? "var(--darkSecond)" : "",
              color: isDark ? "white" : "",
            }}
            type="text"
            placeholder="What are you thinking"
            rows={"4"}
            name="text"
            value={textContent}
            onChange={changeContent}
            className="w-full    resize-none p-2 textarea outline-none"
          />
        </div>
        <div className="  w-full mb-4 flex  overflow-auto  bg-white rounded-xl items-center shadow-[0_0px_30px_rgb(0,0,0,0.3)] ">
          {uploadedFiles.map((image, index) => {
            return (
              <File
                img={image.img}
                name={image.name}
                key={index}
                fileList={[uploadedFiles, setUploadedFiles]}
                filesList={[files, setFiles]}
                notAllowed={[notAllowedFiles, setNotAllowedFiles]}
              />
            );
          })}
          {uploadedFiles.length > 0 && (
            <>
              <label htmlFor="addImage">
                <div className="w-15 h-15 cursor-pointer flex items-center justify-center bg-white shadow-[0_0px_30px_rgb(0,0,0,0.1)] rounded-3xl hover:shadow-[0_0px_30px_rgb(0,0,0,0.2)] duration-[0.3s] shrink-0  p-2 mx-4">
                  <GrFormAdd className="text-5xl " />
                </div>
              </label>
              <input
                className="hidden"
                type="file"
                name="otherImages"
                id="addImage"
                accept="image/*"
                multiple
                onChange={addImage}
              />
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <div className="mr-auto flex gap-3 ">
            <label htmlFor="image">
              <PostIcon Icon={<AiOutlineCamera />} />
            </label>

            <input
              className="hidden"
              type="file"
              name="images"
              id="image"
              accept="image/*"
              multiple
              onChange={onChange}
            />

            {/* <label htmlFor="videos">  */}
            <PostIcon Icon={<AiOutlineVideoCamera />} />
            {/* </label> */}
            {/* <input
              className="hidden"
              type="file"
              id="videos"
              name="videos"
              accept="video/*"
              multiple
            /> */}

            {/* <PostIcon Icon={<AiOutlinePlus />} /> */}
          </div>
          <button className="bg-main rounded-full  text-white px-10">
            Share
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserPost;
