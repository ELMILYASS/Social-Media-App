import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

function File({ img, fileList, name, filesList, notAllowed }) {
  const [uploadedFiles, setUploadedFiles] = fileList;
  const [files, setFiles] = filesList;
  const [notAllowedFiles, setNotAllowedFiles] = notAllowed;
  function deleteFile(e) {
    const updatedListFiles = uploadedFiles.filter((file) => file.name !== name);
    const updatedFiles = files.filter((file) => file.name !== name);
    setUploadedFiles(updatedListFiles);
    setFiles(updatedFiles);
  }
  const style = {
    borderColor: notAllowedFiles.includes(name) ? "red" : "var(--second)",
  };
  return (
    <div className=" shrink-0 p-2 relative">
      <img
        style={style}
        src={img}
        alt=""
        className="w-40 h-36 rounded-xl border-solid  cursor-pointer hover:scale-105 duration-[0.3s] border-[1px] hover:shadow-[0_0px_30px_rgb(0,0,0,0.3)]   object-cover"
      />
      <div className="cursor-pointer" onClick={deleteFile}>
        <AiOutlineCloseCircle className="absolute text-xl top-2 right-2 hover:text-2xl duration-[0.3s]" />
      </div>
    </div>
  );
}

export default File;
