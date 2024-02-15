import React from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
function Table(props) {
  return (
    <>
      <table className="table">
        <caption>{props.tableCaption}</caption>
        <TableHead columns={props.columnsHead} />
        <TableBody columns={props.columnsBody} tableData={props.tableData} />
      </table>
    </>
  );
}

export default Table;
