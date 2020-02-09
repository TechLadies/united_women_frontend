import React from 'react'
import { Link } from 'react-router-dom';
import DropdownFilter from './DropdownFilter';
import './DonorRecords.css';
import NavBarWrapper from '../helpers/NavBarWrapper';
import { withAuthorisedPageHOC } from '../wrappers/withTokenHOC'

const DonorRecords = () => {
  return (
    <div className="donorContainer">
      <div className="row justify-content-md-between">
        <h1 className="col-md-8 font-weight-bold donorHeader">
          Donor Records
        </h1>
          <Link to='/' className="btn btn-outline-primary col-md-2 addDonorBtn" >Add Donor</Link>
      </div>
      <div className="row" style={{marginTop:'35px'}}>
        <div className="col">
          <DropdownFilter />
        </div>
      </div>
      
    </div>
  );
}

export default withAuthorisedPageHOC(NavBarWrapper(DonorRecords));
