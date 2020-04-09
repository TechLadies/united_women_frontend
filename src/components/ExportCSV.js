import React from 'react';
import './ExportCSV.css';

function ExportCSV() {

  const objectToCsv = function (data) {
    const csvRows = [];

    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map(header => {
        const escaped = ("" + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }
    return csvRows.join("\n");
  };

  const download = function (data) {
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "export.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const getReport = async function () {
    const jsonUrl = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(jsonUrl);
    const json = await response.json();

    const data = json.map(row => ({
      id: row.id,
      name: row.name,
      username: row.username,
      email: row.email,
      phone: row.phone,
      website: row.website
    }));

    const csvData = objectToCsv(data);
    download(csvData);
  }

  return (
    <button className="btn btn-primary exportBtn" onClick={e => getReport()}>Export List</button>
  )
}

export default ExportCSV;
