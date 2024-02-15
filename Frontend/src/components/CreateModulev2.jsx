import React, { useState } from "react";
import Table from "./Tables/Table";
import tableData1 from "./tableData1.json";
function CreateModulev2() {
  const [tableData, setTableData] = useState(tableData1);
  const columns = [
    { label: "Full Name", accessor: "full_name" },
    { label: "Email", accessor: "email" },
    { label: "Gender", accessor: "gender" },
    { label: "Age", accessor: "age" },
    { label: "Start date", accessor: "start_date" },
  ];

  return (
    <>
      <Table
        tableCaption="Modules"
        columnsHead={columns}
        columnsBody={columns}
        tableData={tableData}
      />
    </>
  );
}

export default CreateModulev2;
