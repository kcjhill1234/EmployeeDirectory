import React from "react";
import { Input } from "semantic-ui-react";
import { useEmployees } from "../use-employees";

export default function EmployeeSearch() {
  const { state, dispatch, actions } = useEmployees();
  const { query } = state;
  const handleSearch = (e) => {
    const searchText = e.target.value;
    dispatch({ type: actions.SEARCH_CHANGED, query: searchText });
    const filter = ({ first, last, email, phone, location }) => {
      const value = [first, last, email, phone, location].join("");
      return value.includes(searchText);
    };
    dispatch({
      type: actions.FILTERED_EMPLOYEES,
      employees: state.employees.filter(filter),
    });
  };
  return (
    <div>
      <Input
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
        icon="search"
      />
    </div>
  );
}
