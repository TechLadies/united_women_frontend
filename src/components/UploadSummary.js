import React, { useState } from "react";
import NewDonors from "./NewDonors";
import ExistingDonors from "./ExistingDonors";

const UploadSummary = ({ existingDonors, newDonors, hasUploaded} ) => {
  let current = new Date();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  
  if (hasUploaded) { 
    return (
      <div>
        <h2 id="upload-header">
          Upload Summary On{" "}
          {current
            .getDate()
            .toString()
            .concat(
              " ",
              months[current.getMonth()],
              " ",
              current.getFullYear().toString(),
              ", ",
              (current.getHours() < 10? "0" : "") + current.getHours().toString(),
              ":",
              (current.getMinutes() < 10? "0" : "") + current.getMinutes().toString()
            )}
        </h2>
        <h3 className="donor-header">({newDonors.length}) New Donors Created</h3>
        <NewDonors newDonors={newDonors} />
        <hr></hr>
        <h3 className="donor-header">({existingDonors.length}) Current Donors Updated</h3>
        <ExistingDonors existingDonors={existingDonors} />
      </div>
    );
  } else {
    return null;
  }
};

export default UploadSummary;
