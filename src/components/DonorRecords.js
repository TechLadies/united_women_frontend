import React from 'react'
import './DonorRecords.css'
import NavBarWrapper from '../helpers/NavBarWrapper'
import { Link } from 'react-router-dom'

const DonorRecords = () => {
  return(
      <>
        <h1>Donor Records</h1>
        {/* for testing */}
        <Link to='/donor-record' className='nav-link'>Amy Lim</Link>
        <Link to='/add-donor' className='nav-link'>Add donor</Link>
      </>
  )
}

export default NavBarWrapper(DonorRecords)
