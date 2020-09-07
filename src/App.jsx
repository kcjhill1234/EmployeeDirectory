import React from "react";
import Header from "./components/Header";
import DataTable from "./components/DataTable";
import EmployeeSearch from "./components/Employee-Search";
import { useEmployees } from "./use-employees";

function App() {
  const { state } = useEmployees();
  const { filteredEmployees } = state;
  const headers = [
    { display: "First Name", name: "first" },
    { display: "Last Name", name: "last" },
    { display: "Email", name: "email" },
    { display: "Phone", name: "phone" },
    { display: "Location", name: "location" },
  ];
  return (
    <>
      <Header />
      <div className="App">
        <EmployeeSearch />
        {filteredEmployees.length ? (
          <DataTable data={filteredEmployees} headers={headers} />
        ) : (
          <div>No Data...</div>
        )}
      </div>
    </>
  );
}

export default App;
