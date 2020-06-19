import React, { useState } from "react";
import axios from "axios";

const UploadFile = ({ fileValue, fileSource, setFileData, setExistingDonors, setNewDonors, setHasUploaded }) => {
  const onClickHandler = async () => {
    const data = new FormData();
    data.append("csvdata", fileValue);
    data.append("source", fileSource);
    const response = await axios.post("http://localhost:3001/upload-csv", data, {});
    setExistingDonors(response.data.existingDonors);
    setNewDonors(response.data.newDonors);
    setHasUploaded(true);
  };

  if (fileValue && fileSource) {
    return (
      <button id="uploadFileBtn" onClick={onClickHandler}>
        Upload
      </button>
    ); 
  }
  else {
    return (
      <button id="uploadFileBtn" disabled={true}>
        Upload
      </button>
    )
  }
}

export default UploadFile;
