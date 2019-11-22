import React from 'react'
import { Link } from 'react-router-dom';
import DropdownFilter from './DropdownFilter';
import DonorTable from './DonorTable';
import './DonorRecords.css';
import NavBarWrapper from '../helpers/NavBarWrapper';
import ExportCSV from './ExportCSV';

const DonorRecords = () => (
    <div className="donorContainer offset-md-3">
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
      <div className="row justify-content-md-end" style={{marginTop:'20px'}}>
        <div className="col-md-2.5">
          <ExportCSV />
        </div>
      </div>
      <div className="row" style={{marginTop:'20px'}}>
        <div className="col">
          <DonorTable />
        </div>
      </div>
    </div>
);


export default NavBarWrapper(DonorRecords);
