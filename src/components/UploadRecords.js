import React from "react";
import NavBarWrapper from "../helpers/NavBarWrapper";
import { withAuthorisedPageHOC } from "../wrappers/withTokenHOC";
import DropdownSource from "../components/DropdownSource";
import ChooseFile from "../components/ChooseFile";
import UploadFile from "../components/UploadFile";
import ExistingDonors from "../components/ExistingDonors";
import NewDonors from "./NewDonors";
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
        <ExistingDonors />
        <NewDonors />
      </div>
    </main>
  );
};

export default withAuthorisedPageHOC(NavBarWrapper(UploadRecords));
