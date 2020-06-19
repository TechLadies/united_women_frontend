import React, { useState } from "react";
import NavBarWrapper from "../helpers/NavBarWrapper";
import { withAuthorisedPageHOC } from "../wrappers/withTokenHOC";
import DropdownSource from "./DropdownSource";
import ChooseFile from "./ChooseFile";
import UploadFile from "./UploadFile";
import UploadSummary from "./UploadSummary";
import UploadBanner from "./UploadBanner.js";
import "./Upload.css";

const UploadRecords = () => {
  const [fileValue, setFileValue] = useState(null);
  const [fileSource, setFileSource] = useState(null);
  const [existingDonors, setExistingDonors] = useState({});
  const [newDonors, setNewDonors] = useState({});
  const [hasUploaded, setHasUploaded] = useState(false);

  return (
    <main>
      <h1>Upload Records</h1>
      <div>
        <div className="flexbox">
          <DropdownSource setFileSource={setFileSource} />
          <UploadBanner />
          <ChooseFile fileValue={fileValue} setFileValue={setFileValue} />
          <UploadFile fileValue={fileValue} fileSource={fileSource} setExistingDonors={setExistingDonors} 
                      setNewDonors={setNewDonors} setHasUploaded={setHasUploaded}/>
        </div>
        <hr></hr>
        <UploadSummary existingDonors={existingDonors} newDonors={newDonors} hasUploaded={hasUploaded} />
      </div>
    </main>
  );
};

export default withAuthorisedPageHOC(NavBarWrapper(UploadRecords));
