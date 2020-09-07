import React from "react";
import { Table } from "semantic-ui-react";
import { useEmployees } from "../use-employees";

export default function TableHeader({ headers }) {
  const { dispatch, state, actions } = useEmployees();
  const { column, direction } = state;

  const headerCells = headers.map(({ display, name }, i) => (
    <Table.HeaderCell
      key={i}
      sorted={column === name ? direction : null}
      onClick={() => dispatch({ type: actions.CHANGE_SORT, column: name })}
    >
      {display}
    </Table.HeaderCell>
  ));
  return (
    <Table.Header>
      <Table.Row>{headerCells}</Table.Row>
    </Table.Header>
  );
}
