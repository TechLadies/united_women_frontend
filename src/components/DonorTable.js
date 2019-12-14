import React, { useState, useEffect } from 'react';
import axios from "axios";
import donorData from './donorData';
import PageNavigation from './PageNavigation';
import './DonorTable.css';

const DonorTable = props => {

  /*const [data, setData] = useState({donors: [], isFetching: false});

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        setData({donors: data.donors, isFetching: true});
        const response = await axios.get(url);
        setData({donors: response.data, isFetching: false});
      } catch (e) {
        console.log(e);
        setData({donors: data.donors, isFetching: false});
      }
    };
    fetchDonors();
  }, []);*/

  const [currentPage, setCurrentPage] = useState(1);
  const [donorsPerPage] = useState(15);

  const sortedByDescDonors = donorData.sort(function(a, b) {
    a = new Date(a.date);
    b = new Date(b.date);
    return a>b ? -1 : a<b ? 1 : 0;
  });

  const indexOfLastDonor = currentPage * donorsPerPage;
  const indexOfFirstDonor = indexOfLastDonor - donorsPerPage;
  const donorsOnCurrentPage = sortedByDescDonors.slice(indexOfFirstDonor, indexOfLastDonor);
  const totalPages = (donorData.length) / donorsPerPage;

  const decrement = () => {
    if (currentPage > 1)
    { setCurrentPage(currentPage - 1)
    }};

  const increment = () => {
    if (currentPage < totalPages)
    { setCurrentPage(currentPage + 1)
    }};

  const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="table-responsive-sm">
          <table className="table table-striped">
            <thead className="donorTableHeader">
              <tr >
                <th>NRIC/UEN</th>
                <th>Name</th>
                <th>Total Donated</th>
                <th>Campaign</th>
                <th>Source</th>
                <th>Donation Start</th>
              </tr>
            </thead>
            <tbody className="donorTableBody">
            {props.data.map(donor => (
                <tr>
                  <td>{ donor.nric }</td>
                  <td>{ donor.name }</td>
                  <td>{ donor.amt }</td>
                  <td>{ donor.campaign }</td>
                  <td>{ donor.source }</td>
                  <td>{ donor.date }</td>
                </tr>
              ))
            }
            </tbody>
          </table>
          <div className="row justify-content-end">
            <div className="col-md-2 noOfRecords">
              { donorsOnCurrentPage.length } out of { donorData.length } records
            </div>
          </div>
          <div className="row justify-content-center" style={{marginTop:'35px'}}>
            <div className="col-md-2">
              <PageNavigation donorsPerPage={ donorsPerPage } totalDonors={ donorData.length } paginate={ paginate } curentPage={ currentPage } decrement = { decrement } increment = { increment } />
            </div>
          </div>
      </div>
    )
};

export default DonorTable;