import React from 'react'
import NavBarWrapper from '../helpers/NavBarWrapper'
import { Link } from 'react-router-dom'

const AddDonor = () => {
    return (
        <>
            <h1>Donor Records</h1>
            <div className="breadcrumbs">
                <p><Link to="/">Donor List</Link>  >  <strong>New Donor</strong></p>
            </div>
        </>
    )
}

 export default NavBarWrapper(AddDonor)