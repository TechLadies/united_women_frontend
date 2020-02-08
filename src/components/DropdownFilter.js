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
  const [totalItems, setTotalItems] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  const [currentDate, setCurrentDate] = useState(new Date());
  const initialCurrentDate = new Date();
  const [startDate, setStartDate] = useState(initialCurrentDate.setMonth(initialCurrentDate.getMonth() - 12));
  const [entityType, setEntityType] = useState('');
  const [frequency, setFrequency] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  const getURLParams = () => {
    let url = window.location.href;
    let splitURLArray = url.split('?');
    let params = splitURLArray[1];
    return params;
  }

  const setInitialURLParams = () => {
    let params = getURLParams();
    let searchParams = new URLSearchParams(params);
    for (var pair of searchParams.entries()) {
      var key = pair[0];
      var value = pair[1];
      filterValues[key] = value;
      if (key == "dateStart") {
        setStartDate(value);
      } else if (key == "dateEnd") {
        setCurrentDate(value);
      } else if (key == "donorTypeId") {
        setEntityType(value);
      } else if (key == "donorFrequencyId") {
        setFrequency(value);
      }
    }
    }

  const fetchFilteredDonors = async queryString => {
    const json = await fetch(
      `${process.env.REACT_APP_BACKEND_API_HOSTNAME}/donors${queryString}`
    ).then(response => response.json());
    setDonors(json.data);
    setPerPage(json.perPage);
  };

  useEffect(() => {
    const loadDonors = async () => {
      let params = getURLParams();
      const json = await fetch(`${process.env.REACT_APP_BACKEND_API_HOSTNAME}/donors?page=1&perPage=${perPage}&${params}`)
        .then(response =>
        response.json()
      );
      setDonors(json.data);
      setPerPage(json.perPage);
    };
    loadDonors();
    setInitialURLParams();
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

  const handleNameChange = event => {
    let name = event.target.value;
    setNameFilter(name);
    handleFilterChange("name", name);
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
    window.history.pushState(queryString, "", `?${queryString}`);
  }

  const exportCSV = () => {
    let params = getURLParams();
    let date = new Date();
    let dateString = date.toDateString();
    let timeString = date.toLocaleTimeString();

    fetch(`${process.env.REACT_APP_BACKEND_API_HOSTNAME}/donors/download?${params}`).then(response => {
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = `donors-${dateString + '-' + timeString}.csv`;
        a.click();
      });
    });
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
            <option value="1">Individual</option>
            <option value="2">Company</option>
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
        <div className="form-group">
          <input type="text"
            name="name"
            placeholder="Search by name"
            className="form-control  m-2"
            value={nameFilter}
            onChange={handleNameChange} />
        </div>
        <button
          type="submit"
          className="btn btn-primary m-2"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
        <button onClick={exportCSV} className="btn btn-outline-primary m-2">Download</button>
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
              <td><a href={`/donors/${donor.id}/donations`} className="row-link">{donor.donorTypeId == 1 ? "individual" : "company"}</a></td>
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
