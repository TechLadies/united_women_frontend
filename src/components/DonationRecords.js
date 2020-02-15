import React, { useState, useEffect } from "react";
import NavBarWrapper from '../helpers/NavBarWrapper'
import Table from "react-bootstrap/Table";
import { withAuthorisedPageHOC } from '../wrappers/withTokenHOC'
import moment from "moment";
import Pagination from './Pagination';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DonationRecords = () => {

  const [donations, setDonations] = useState([]);
  const [filterValues, setFilterValues] = useState({});

  const [perPage, setPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  const [currentDate, setCurrentDate] = useState(new Date());
  const initialCurrentDate = new Date();
  const [startDate, setStartDate] = useState(initialCurrentDate.setMonth(initialCurrentDate.getMonth() - 12));
  const [campaign, setCampaign] = useState('');
  const [source, setSource] = useState('');
  const [entityType, setEntityType] = useState('');

  const fetchFilteredDonations = async queryString => {
    const json = await fetch(
      `${process.env.REACT_APP_BACKEND_API_HOSTNAME}/donations${queryString}`
    ).then(response => response.json());
    setDonations(json.data);
    setPerPage(json.perPage);
  };

  useEffect(() => {
    const loadDonations = async () => {
      const json = await fetch(`${process.env.REACT_APP_BACKEND_API_HOSTNAME}/donations?page=1&perPage=${perPage}`).then(response =>
        response.json()
      );
      setDonations(json.data);
      setPerPage(json.perPage);
    };
    loadDonations();
  }, []);

  const handleFilterChange = (key, value) => {
    filterValues[key] = value;
  };

  const handleDateChange = (key, value) => {
    value.setHours(0, 0, 0, 0);
    let dateString = value.toISOString();
    handleFilterChange(key, dateString);
  }

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    handleFilterChange("page", pageNumber);
    handleApplyFilters();
  };

  const handleApplyFilters = () => {
    const queryString = Object.keys(filterValues).map(key => key + '=' + filterValues[key]).join('&');
    fetchFilteredDonations("?" + queryString);
    window.history.pushState(queryString, "", `/donation-records?${queryString}`);
  }

  const handleCampaignChange = event => {
    let campaignType = event.target.value;
    setCampaign(campaignType);
    handleFilterChange("campaign", campaignType);
  }
  const handleSourceChange = event => {
    let sourceName = event.target.value;
    setSource(sourceName);
    handleFilterChange("source", sourceName);
  }

  const handleEntityTypeChange = event => {
    let donorType = event.target.value;
    setEntityType(donorType);
    handleFilterChange("donorType", donorType);
  }

  return (
    <main>
      <h1>Donation Records</h1>
      <div className="form-inline mb-3">
        <div className="form-group ">
          <label for="from-date">Filter by:</label>
          <DatePicker
            id="from-date"
            selected={startDate}
            maxDate={new Date()}
            onSelect={date => handleDateChange('dateStart', date)}
            onChange={date => setStartDate(date)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>
        <div className="form-group">
          <label for="until-date">to</label>
          <DatePicker
            id="until-date"
            selected={currentDate}
            maxDate={new Date()}
            onSelect={date => handleDateChange('dateEnd', date)}
            onChange={date => setCurrentDate(date)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>
        <div className="form-group">
          <select name="campaign-type"
            value={campaign}
            onChange={handleCampaignChange}
            className="form-control m-2">
            <option value="">All Campaigns</option>
            <option value="STEM">STEM</option>
            <option value="Anti-Violence">Anti-violence</option>
          </select>
        </div>
        <div className="form-group">
          <select name="source"
            value={source}
            onChange={handleSourceChange}
            className="form-control m-2">
            <option value="">All sources</option>
            <option value="Benevity">Benevity</option>
            <option value="Paypal">Paypal</option>
            <option value="Giving.sg">Giving.sg</option>
          </select>
        </div>
        <div className="form-group">
          <select name="donor-type"
            value={entityType}
            onChange={handleEntityTypeChange}
            className="form-control m-2">
            <option value="">All Entities</option>
            <option value="Individual">Individual</option>
            <option value="Company">Company</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary m-2"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
        {/*<a href="#" onClick={exportCSV} className="btn btn-outline-primary m-2">Download</a>*/}
      </div>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Campaign</th>
            <th>Source</th>
            <th>Donor</th>
            <th>Entity type</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, index) => (
            <tr key={index}>
              <td>{moment(donation.donationDate).format("Do MMMM YYYY")}</td>
              <td>${donation.amount.slice(0, -2)}</td>
              <td>{donation.Campaign.type}</td>
              <td>{donation.Source.name}</td>
              <td><a href={`/donors/${donation.Donor.id}/donations`} className="row-link">{donation.Donor.name}</a></td>
              <td>{donation.Donor.donorTypeId == 1 ? "individual" : "company"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        perPage={perPage}
        totalItems={totalItems}
        paginate={paginate}
        currentPage={currentPage}
      />
    </main>
  )
}
export default withAuthorisedPageHOC(NavBarWrapper(DonationRecords))
