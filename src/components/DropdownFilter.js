import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DropdownFilter.css";
import Pagination from './Pagination';
import moment from "moment";

const DropdownFilter = () => {
  const [donors, setDonors] = useState([]);
  const [filterValues, setFilterValues] = useState({});

  const [perPage, setPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const [currentDate, setCurrentDate] = useState(new Date());
  const initialCurrentDate = new Date();
  const [startDate, setStartDate] = useState(initialCurrentDate.setMonth(initialCurrentDate.getMonth() - 12));
  const [entityType, setEntityType] = useState('');
  const [frequency, setFrequency] = useState('');

  /*  var paramsString1 = "http://example.com/search?key1=value1&key2=value2";
    var searchParams1 = new URLSearchParams(paramsString1);
    for (var pair of searchParams1.entries()) {
      //console.log(pair[0] + ", " + pair[1]);
    }
  */

  const fetchFilteredDonors = async queryString => {
    const json = await fetch(
      `http://localhost:3001/donors${queryString}`
    ).then(response => response.json());
    setDonors(json.data);
    setPerPage(json.perPage);
  };

  useEffect(() => {
    const loadDonors = async () => {
      const json = await fetch(`http://localhost:3001/donors?page=1&perPage=${perPage}`).then(response =>
        response.json()
      );
      setDonors(json.data);
      setPerPage(json.perPage);
    };
    loadDonors();
  }, []);

  const handleFilterChange = (key, value) => {
    filterValues[key] = value;
  };

  const handleDateChange = (key, value) => {
    value.setHours(0, 0, 0, 0);
    let dateString = value.toISOString();
    handleFilterChange(key, dateString);
  }

  const handleEntityTypeChange = event => {
    let donorTypeId = event.target.value;
    setEntityType(donorTypeId);
    handleFilterChange("donorTypeId", donorTypeId);
  }

  const handleFrequencyChange = event => {
    let frequencyId = event.target.value;
    setFrequency(frequencyId);
    handleFilterChange("donorFrequencyId", frequencyId);
  }

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    handleFilterChange("page", pageNumber);
    handleFilterChange("perPage", perPage);
    handleApplyFilters();
  };

  const handleApplyFilters = () => {
    //const queryString = "perPage=2";
    const queryString = Object.keys(filterValues).map(key => key + '=' + filterValues[key]).join('&');
    fetchFilteredDonors("?" + queryString);
    window.history.pushState(queryString, "", `/donors?${queryString}`);
  }


  const exportCSV = () => {
    console.log(donors);
  }

  return (
    <React.Fragment>
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
          <select name="donor-type"
            value={entityType}
            onChange={handleEntityTypeChange}
            className="form-control m-2">
            <option value="">All Entities</option>
            <option value="1">Company</option>
            <option value="2">Individual</option>
          </select>
        </div>
        <div className="form-group">
          <select name="donor-type"
            value={frequency}
            onChange={handleFrequencyChange}
            className="form-control m-2">
            <option value="">All Frequency</option>
            <option value="1">Recurring</option>
            <option value="2">One-time</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary m-2"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
        <button
          className="btn btn-outline-primary m-2"
          onClick={exportCSV}
        >
          Export
        </button>
      </div>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>NRIC/UEN</th>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Frequency</th>
            <th>Total Donated</th>
            <th>Donation Start</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor, index) => (
            <tr key={index}>
              <td><a href={`/donors/${donor.id}/donations`} className="row-link">{donor.identifier}</a></td>
              <td><a href={`/donors/${donor.id}/donations`} className="row-link">{donor.name}</a></td>
              <td><a href={`/donors/${donor.id}/donations`} className="row-link">{donor.email}</a></td>
              <td><a href={`/donors/${donor.id}/donations`} className="row-link">{donor.donorTypeId == 1 ? "company" : "individual"}</a></td>
              <td><a href={`/donors/${donor.id}/donations`} className="row-link">{donor.donorFrequencyId == 1 ? "recurring" : "one-time"}</a></td>
              <td><a href={`/donors/${donor.id}/donations`} className="row-link">${donor.total_amount.slice(0, -2)}</a></td>
              <td><a href={`/donors/${donor.id}/donations`} className="row-link">{moment(donor.donationStart).format("Do MMMM YYYY")}</a></td>

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

    </React.Fragment>
  );
};

export default DropdownFilter;
