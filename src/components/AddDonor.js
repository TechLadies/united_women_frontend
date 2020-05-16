import React, { useState } from "react";
import NavBarWrapper from '../helpers/NavBarWrapper'
import { Link } from 'react-router-dom'
import EditDonorForm from "./EditDonorForm";


const AddDonor = () => {
    const donationStartDate = new Date();
    const [donor, setDonor] = useState({
        donorType: "1",
        salutation: "1",
        frequency: "1",
        contactMode: "1",
        doNotContact: false,
        donationStart: donationStartDate
    })
    const [error, setError] = useState("")
    const handleInputChange = event => {
        const { name, value } = event.target;
        setDonor({ ...donor, [name]: value });
    };
    const handleCheckboxChange = event => {
        const { name } = event.target;
        setDonor({ ...donor, [name]: event.target.checked });
    };
    const handleSubmit = event => {
        addDonor();
    };
    const addDonor = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API_HOSTNAME}/donors/add`, {
            method: "POST",
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
                doNotContact: donor.doNotContact,
                donationStart: donor.donationStart
            })
        });
        const responseJson = await response.json();
        if (response.status == 400) {
            setError(responseJson.error)
        } else {
            // handle successful registration
        }
    }

    return (
        <>
            <h1>Donor Records</h1>
            <div className="breadcrumbs">
                <p><Link to="/">Donor List</Link>  >  <strong>Add Donor</strong></p>
            </div>
            <div className="btn-toolbar">
                <button
                    onClick={handleSubmit}
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </div>
            {<EditDonorForm
                donor={donor}
                editing={true}
                handleInputChange={handleInputChange}
                handleCheckboxChange={handleCheckboxChange}
                handleSubmit={handleSubmit}
            />}
            <p>{error}</p>
        </>
    )
}

export default NavBarWrapper(AddDonor)