import React, { useEffect, useState } from "react";
import { readAll } from "../services/records.service";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import "../Components/Records.css";
import axios from 'axios'
const Records = () => {
  const [records, setRecords] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [filteredRecords, setFilteredRecords] = useState(records);


  useEffect(() => {
    readAll()
      .then((response) => {
        console.log(`Recived the data ${response.data}`);
        setRecords(response.data);
        setFilteredRecords(response.data);
      })
      .catch((error) => {
        console.log(`error occured ${error}`);
      });
  }, []);

  const handleFilter = () => {
    const filtered = records.filter((rec) =>
      rec.name.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredRecords(filtered);
  };

  const handleSearchChange = (event) => {
    setFilterValue(event.target.value);
    handleFilter();
  };

  const searchRecords = () => {
    axios
      .get(`http://localhost:8080/records/search?name=${filterValue}`)
      .then((response) => {
        console.log(`Received filtered data ${response.data}`);
        setFilteredRecords(response.data);
      })
      .catch((error) => {
        console.log(`Error occurred ${error}`);
      });
  };
  

  return (
    <div className="container">
    {/* <label htmlFor="filterInput">Filter by Stage:</label>
    <input
      type="text"
      id="filterInput"
      value={filterValue}
      onChange={handleSearchChange}
    /> */}
<div className="Stage">
<label htmlFor="filterInput">Filter by Stage:</label>
      <select id="filterInput" value={filterValue} onChange={handleSearchChange}>
        <option >Inital Authorization</option>
        <option >Enchancement</option>
        <option >Discharge</option>
      </select>
    <button onClick={searchRecords}>Search</button>
    </div>
    <div className="Status">
    <label htmlFor="filterInput">Filter by Status:</label>
      <select id="filterInput" value={filterValue} onChange={handleSearchChange}>
        <option >Pending Approval</option>
        <option >TPA Query</option>
        
      </select>
    <button onClick={searchRecords}>Search</button>
    </div>
    {/* <button onClick={fetchRecords}>Reset</button> */}
      <MDBTable striped hover class="table table-striped">
        <MDBTableHead dark>
          <tr>
            <th scope="col">Claim ID</th>
            <th scope="col">Name</th>
            <th scope="col">Ailment</th>
            <th>SLA</th>
            <th>P-TAT</th>
            <th>Stage</th>
            <th>Status</th>
            <th>Approved Amount</th>
            <th>Hospital</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {filteredRecords.map((rec) => (
            <tr key={rec.id}>
              <td>{rec.claim_id}</td>
              <td>{rec.name}</td>
              <td>{rec.ailment}</td>
              <td>{rec.sla}</td>
              <td>{rec.p_TAT}</td>
              <td>{rec.stage}</td>
              <td>{rec.status}</td>
              <td>{rec.approved_Amount}</td>
              <td>{rec.hospital}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default Records;
