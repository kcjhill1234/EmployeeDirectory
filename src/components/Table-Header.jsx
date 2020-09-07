import React from "react";
import { Table } from "semantic-ui-react";

export default function TableHeader({ headers }) {
  const headerCells = headers.map(({ display, name }, i) => (
    <Table.HeaderCell key={i}>{display}</Table.HeaderCell>
  ));
  return (
    <Table.Header>
      <Table.Row>{headerCells}</Table.Row>
    </Table.Header>
  );
}
