import React from "react";
import NewDonors from "./NewDonors";
import ExistingDonors from "./ExistingDonors";

const UploadSummary = () => {
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
    "Dec"
  ];

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
            current.getHours().toString(),
            ":",
            current.getMinutes().toString()
          )}
      </h2>
      <NewDonors />
      <ExistingDonors />
    </div>
  );
};

export default UploadSummary;
