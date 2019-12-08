import React from "react";
import "./DonorRecords.css";
import NavBarWrapper from "../helpers/NavBarWrapper";
import { Link } from "react-router-dom";

const DonorRecords = () => {
  const users = [
    { name: `Amy Lim`, id: 1 },
    { name: `Kelvin Ng`, id: 2 },
    { name: `Joyce Lee`, id: 3 }
  ];

  return (
    <>
      <h1>Donor Records</h1>
      {/* for testing */}

      {users.map((user, index) => (
        <Link
          key={index}
          to={`/donors/${user.id}/donations`}
          className="nav-link"
        >
          {user.name}
        </Link>
      ))}
      <Link to="/add-donor" className="nav-link">
        Add donor
      </Link>
    </>
  );
};

export default NavBarWrapper(DonorRecords);
