import React from "react";

function TableHead({ columns }) {
  console.log(columns);
  return (
    <>
      <thead>
        <tr>
          {columns.map(({ label, accessor }) => (
            <th key={accessor}>{label}</th>
          ))}
        </tr>
      </thead>
    </>
  );
}

export default TableHead;
