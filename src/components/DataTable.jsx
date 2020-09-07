import React from "react";
import { Table } from "semantic-ui-react";
import TableHeader from "./Table-Header";
import TableBody from "./Table-Body";

export default function DataTable({ data, headers }) {
  return (
    <Table sortable striped color="blue">
      <TableHeader headers={headers} />
      <TableBody data={data} />
    </Table>
  );
}
