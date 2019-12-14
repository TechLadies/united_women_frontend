import React, { useState, useEffect } from 'react';
import axios from "axios";
import donationData from './donationData';
import PageNavigation from './PageNavigation';
import './DonationTable.css';

const DonationTable = () => {

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
  const [donationsPerPage] = useState(15);

  const sortedByDescDonors = donationData.sort(function(a, b) {
    a = new Date(a.date);
    b = new Date(b.date);
    return a>b ? -1 : a<b ? 1 : 0;
  });

  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const donationsOnCurrentPage = sortedByDescDonors.slice(indexOfFirstDonation, indexOfLastDonation);
  const totalPages = (donationData.length) / donationsPerPage;

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
            <thead className="donationTableHeader">
              <tr >
                <th>Date of Donation</th>
                <th>Amount</th>
                <th>Campaign</th>
                <th>Source</th>
                <th>Donor Name</th>
                <th>Donor ID</th>
              </tr>
            </thead>
            <tbody className="donationTableBody">
            {
              donationsOnCurrentPage.map(donor => (
                <tr>
                  <td>{ donor.date }</td>
                  <td>{ donor.amt }</td>
                  <td>{ donor.campaign }</td>
                  <td>{ donor.source }</td>
                  <td>{ donor.name }</td>
                  <td>{ donor.nric }</td>
                </tr>
              ))
            }
            </tbody>
          </table>
          <div className="row justify-content-end">
            <div className="col-md-2 noOfRecords">
              { donationsOnCurrentPage.length } out of { donationData.length } records
            </div>
          </div>
          <div className="row justify-content-center" style={{marginTop:'35px'}}>
            <div className="col-md-2">
              <PageNavigation donationsPerPage={ donationsPerPage } totalDonors={ donationData.length } paginate={ paginate } curentPage={ currentPage } decrement = { decrement } increment = { increment } />
            </div>
          </div>
      </div>
    )
};

export default DonationTable;

