import React from "react";
import NavBarWrapper from "../helpers/NavBarWrapper";
import { withAuthorisedPageHOC } from "../wrappers/withTokenHOC";
import DropdownSource from "./DropdownSource";
import ChooseFile from "./ChooseFile";
import UploadFile from "./UploadFile";
import UploadSummary from "./UploadSummary"
import "./Upload.css";

const UploadRecords = () => {
  return (
    <main>
      <h1>Upload Records</h1>
      <div>
        <div className="flexbox">
          <DropdownSource />
          <ChooseFile />
          <UploadFile />
        </div>
        <hr></hr>
        <UploadSummary />
      </div>
    </main>
  );
};

export default withAuthorisedPageHOC(NavBarWrapper(UploadRecords));
