import React from "react";

const NewDonors = () => {
  let current = new Date();
  return (
    <React.Fragment>
      <h2>
        Upload Summary On{" "}
        {current.toDateString().concat(", ", current.toLocaleTimeString())}
      </h2>
      <h3>
          New Donors
      </h3>
    </React.Fragment>
  );
};

export default NewDonors;
