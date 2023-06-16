import Image from "next/image";
import axios from "axios";
import { useRef, useState } from "react";

import SpinLoader from "./SpinLoader";
import DragOverlay from "./DragOverlay";
import { validFiles } from "@utils";

import uploadIcon from "../public/assets/icons/upload.svg";
import ArrowRight from "../public/assets/icons/arrow_right.svg";


const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [areInvalidFiles, setAreInvalidFiles] = useState(false);
  const [isDropping, setisDropping] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [doneScripting, setDoneScripting] = useState(false);

  const inputRef = useRef();

  const resetStates = () => {
    setFile(null);
    setisDropping(false);
    setUploading(false);
    setDoneScripting(false);
    setAreInvalidFiles(false);
  };

  const handleDragLeave = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setisDropping(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setFile(e.dataTransfer.files);
    setisDropping(false);
  };

  const handleInputChange = (e) => {
    if (e.target.files.length == 3 ) {
      resetStates();
      setFile(e.target.files);
    } else {
      resetStates();
      setAreInvalidFiles(true);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setisDropping(true); // Show the overlay
  };

  const allowDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleUpload = async (e) => {
    setUploading(true);
    try {
      const ValidFiles = validFiles(file);
      console.log(ValidFiles);
      if (ValidFiles.length != 3) {
        setAreInvalidFiles(true);
        setFile(null);
        setUploading(false);
        return;
      } else {
        const formData = new FormData();
        formData.append("excel", ValidFiles[0]);
        formData.append("audio", ValidFiles[1]);
        formData.append("text", ValidFiles[2]);
        const { data, status } = await axios.post("/api/upload", formData);
        if (status == 201) {
          console.log(data);
          setDoneScripting(true);
        }
        setUploading(false);
      }
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <>
    {/* Overlay to show while dragging some files */}
      {isDropping ? (
        <DragOverlay
          allowDrag={allowDrag}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
        />
      ) : null}

      <section
        onDragEnter={handleDragEnter}
        className={`${
          isDropping ? "opacity-50 " : ""
        } relative border-zinc-100 border-dashed border-2 p-10 flex justify-center flex-col gap-5 items-center w-full h-4/5`}
      >
        {/* When uploading is in progress */}
        {uploading ? <SpinLoader /> : null}

        {/* When Files are invalid */}
        {areInvalidFiles && (
          <h3 className="text-xl bg-zinc-800 px-4 py-2 rounded-lg text-red-700">
            You must upload 3 files (excel, mp3 & text)
          </h3>
        )}

        {file ? (
          <div className="text-center">
            {doneScripting ? (
              <>
                <h3 className="text-5xl"> Calls Sent Successfully!</h3>
              </>
            ) : (
              <>
                {<h3 className="text-5xl">{file[0].name}</h3>}
                {<h3 className="text-5xl">{file[1].name}</h3>}
                {<h3 className="text-5xl">{file[2].name}</h3>}
              </>
            )}
          </div>
        ) : (
          <>
            {!uploading ? (
              <>
                <span
                  className="bg-sky-600 p-2 rounded-full drop-shadow-lg cursor-pointer"
                  onClick={() => {
                    inputRef.current.click();
                  }}
                >
                  <Image
                    src={uploadIcon}
                    width="48"
                    height="auto"
                    alt="upload-icon"
                  />
                </span>
                <div className="text-center">
                  <h3 className="text-5xl">Drag & Drop</h3>
                  <p className="text-base mt-2 text-zinc-400">
                    Supports xlsx, mp3 & text files
                  </p>
                </div>
              </>
            ) : null}
          </>
        )}
      </section>
      <input
        type="file"
        multiple
        onChange={handleInputChange}
        hidden
        ref={inputRef}
      />
      {file ? (
        <button
          className="absolute flex gap-2 top-10 right-10 px-10 bg-sky-600 py-4 text-base font-medium rounded-md"
          onClick={handleUpload}
        >
          Run Script
          <Image
            src={ArrowRight}
            height={"auto"}
            width={"auto"}
            alt="arrow-right"
          />
        </button>
      ) : null}
    </>
  );
};

export default FileUpload;
