import React from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import donationData from "./donationData";

const NewDonors = ({newDonors}) => {
  if (newDonors.length > 0) {
    return (
      <main className="newDonors">
        <Table striped hover>
          <thead>
            <tr>
              <th>NRIC/UEN</th>
              <th>Salutation</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Donation</th>
            </tr>
          </thead>
          {newDonors.map((record) => (
            <tr>
              <td>{record.donor.identifier}</td>
              <td>{record.donor.salutation}</td>
              <td>{record.donor.name}</td>
              <td>{record.donor.email}</td>
              <td>{record.donor.contactNo}</td>
              <td>${record.donation.amount}</td>
            </tr>
          ))}
        </Table>
      </main>
    );
  }
  else {
    return null;
  }
};
export default NewDonors;
