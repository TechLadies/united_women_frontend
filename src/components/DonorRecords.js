import React from 'react'
import './DonorRecords.css'
import NavBarWrapper from '../helpers/NavBarWrapper'
import { Link } from 'react-router-dom'

const DonorRecords = () => {
  return(
      <main>
        <h1>Donor Records</h1>
        {/* for testing */}
        <Link to='/donor-record' className='nav-link'>Amy Lim</Link>
    </main>
  )
}

export default NavBarWrapper(DonorRecords)
