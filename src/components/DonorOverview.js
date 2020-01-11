import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import EditDonorForm from "./EditDonorForm";
import NavBarWrapper from "../helpers/NavBarWrapper";
import DonationHistory from "./DonationHistory";
import { withAuthorisedPageHOC } from "../wrappers/withTokenHOC";

const DonorOverview = props => {
  const id = props.match.params.id;
  const [donor, setDonor] = useState({});
  const [editing, setEditing] = useState(false);
  const [validated, setValidated] = useState(false);
  const [initialDonor, setInitialDonor] = useState({});

  useEffect(() => {
    const loadDonorInfo = async () => {
      const json = await fetch(
        `${process.env.REACT_APP_BACKEND_API_HOSTNAME}/donors/${id}`
      ).then(response => response.json());
      let initial = {
        name: json.name,
        email: json.email,
        identifier: json.identifier,
        donorType: json.donorTypeId,
        frequency: json.donorFrequencyId,
        salutation: json.salutationId,
        contactNo: json.contactNo,
        address: json.address,
        contactMode: json.preferredContactMode,
        doNotContact: json.doNotContact
      };
      setInitialDonor({ ...initial });
      setDonor({ ...initial });
    };
    loadDonorInfo();
  }, []);

  const updateDonor = () => {
    fetch(`${process.env.REACT_APP_BACKEND_API_HOSTNAME}/donors/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: donor.name,
        email: donor.email,
        identifier: donor.identifier,
        donorFrequencyId: parseInt(donor.frequency, 10),
        donorTypeId: parseInt(donor.donorType, 10),
        salutationId: parseInt(donor.salutation, 10),
        contactNo: donor.contactNo,
        address: donor.address,
        preferredContactMode: parseInt(donor.contactMode, 10),
        doNotContact: donor.doNotContact
      })
    });
    setDonor({
      name: donor.name,
      email: donor.email,
      identifier: donor.identifier,
      donorType: donor.donorType,
      frequency: donor.frequency,
      salutation: donor.salutation,
      contactNo: donor.contactNo,
      address: donor.address,
      contactMode: donor.contactMode,
      doNotContact: donor.doNotContact
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

  const handleCheckboxChange = event => {
    const { name } = event.target;
    setDonor({ ...donor, [name]: event.target.checked });
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
        setDonor({ ...initialDonor });
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
          handleCheckboxChange={handleCheckboxChange}
          validated={validated}
          handleSubmit={handleSubmit}
        />
      </div>
      <DonationHistory props={props} userId={id} />
    </>
  );
};

export default withAuthorisedPageHOC(NavBarWrapper(DonorOverview));
