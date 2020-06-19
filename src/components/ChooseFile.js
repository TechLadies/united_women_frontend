import React, { useRef } from "react";
import "./ChooseFile.css";

const ChooseFile = ({ fileValue, setFileValue }) => {
  const fileInput = useRef(null);

  const onFileChange = () => {
    if (fileInput && fileInput.current.files && fileInput.current.files[0]) {
      setFileValue(fileInput.current.files[0]);
    }
  };

  const triggerFileInputClick = () => {
    // Remove file if it is present in page
    if (fileInput && fileValue) {
      fileInput.current.value = null;
      setFileValue(null);
    } else if (fileInput) {
      fileInput.current.click();
    }
  };

  const getFileButton = () => {
    return (
      <button
        id="chooseFileBtn"
        onClick={triggerFileInputClick}
        className="btn btn-outline-primary"
      >
        {fileValue ? "Remove File" : "Choose File"}
      </button>
    );
  };

  const getFileLabel = () => {
    return (
      <span id="filemsg"
        onClick={triggerFileInputClick} 
        className="choosefile-button-sidetext">
        {fileValue ? `File Chosen: ${fileValue.name}` : 'Please choose a file to upload'}
      </span>
    );
  };

  return (
    <div className="choosefile-button">
      { getFileButton() }
      <input 
        type="file" 
        style={{display: 'none'}} 
        onChange={onFileChange}
        ref={fileInput}
      />
      {getFileLabel()}
    </div>
  );
};

export default ChooseFile;
