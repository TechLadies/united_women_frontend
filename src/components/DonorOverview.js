import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import EditDonorForm from "./EditDonorForm";
import NavBarWrapper from "../helpers/NavBarWrapper";
import DonationHistory from "./DonationHistory";
import { withAuthorisedPageHOC } from '../wrappers/withTokenHOC'

const DonorOverview = props => {
  const id = props.match.params.id;
  const [donor, setDonor] = useState({});
  const [editing, setEditing] = useState(false);
  const [validated, setValidated] = useState(false);
  const [initialDonor, setInitialDonor] = useState({});

  useEffect(() => {
    const loadDonorInfo = async () => {
      const json = await fetch(
        `http://localhost:3001/donors/${id}`
      ).then(response => response.json());
      let initial = {
        name: json.name,
        email: json.email,
        identifier: json.identifier,
        frequency: json.donorFrequency.donorFrequency,
        salutation: json.salutation.salutation,
        contactNo: json.contactNo,
        address: json.address
      };
      setInitialDonor({ ...initial });
      setDonor({ ...initial });
    };
    loadDonorInfo();
  }, []);

  const updateDonor = () => {
    setDonor({
      name: donor.name,
      email: donor.email,
      identifier: donor.identifier,
      frequency: donor.frequency,
      salutation: donor.salutation,
      contactNo: donor.contactNo,
      address: donor.address
    });
  };

  const handleSubmit = event => {
    const form = event.currentTarget.form;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      setEditing(false);
      setValidated(false);
      updateDonor();
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setDonor({ ...donor, [name]: value });
  };

  const SaveButton = () => (
    <button
      onClick={handleSubmit}
      className="btn btn-primary"
      disabled={!editing}
      form="donor-form"
      type="submit"
    >
      Save edits
    </button>
  );

  const CancelButton = () => (
    <button
      onClick={() => {
        setDonor({});
        setEditing(false);
      }}
      className="btn btn-link"
    >
      Cancel
    </button>
  );

  const EditButton = () => (
    <button
      onClick={() => setEditing(true)}
      className="btn btn-outline-primary"
    >
      Edit donor
    </button>
  );

  return (
    <>
      <h1>Donor Records</h1>

      <div className="breadcrumbs">
        <p>
          <Link to="/">Donor List</Link> > <strong>{donor.name}</strong>
        </p>
        {editing ? (
          <div className="btn-toolbar">
            <CancelButton />
            <SaveButton />
          </div>
        ) : (
          <EditButton />
        )}
      </div>
      <div>
        <EditDonorForm
          donor={donor}
          editing={editing}
          handleInputChange={handleInputChange}
          validated={validated}
          handleSubmit={handleSubmit}
        />
      </div>
      <DonationHistory props={props} userId={id} />
    </>
  );
};

export default withAuthorisedPageHOC(NavBarWrapper(DonorOverview))
