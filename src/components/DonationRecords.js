import React from "react";
import { Link } from "react-router-dom";
//import DropdownFilter from './DropdownFilter';
import DonationTable from "./DonationTable";
import "./DonationRecords.css";
import NavBarWrapper from "../helpers/NavBarWrapper";
import ExportCSV from "./ExportCSV";

const DonationRecords = () => (
  <div className="donationContainer offset-md-3">
    <div className="row justify-content-md-between">
      <h1 className="col-md-8 font-weight-bold donationHeader">
        Donation Records
      </h1>
    </div>
    <div className="row justify-content-md-end" style={{ marginTop: "20px" }}>
      <div className="col-md-2.5">
        <ExportCSV />
      </div>
    </div>
    <div className="row" style={{ marginTop: "20px" }}>
      <div className="col">
        <DonationTable />
      </div>
    </div>
  </div>
);

export default NavBarWrapper(DonationRecords);
