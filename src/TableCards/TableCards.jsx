import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";

const TableCards = () => {
  const statePeople = useSelector((store) => store.people);
  // console.log("statePeople", statePeople);
  const dispatch = useDispatch();
  const [dataCards, setDataCards] = useState(statePeople);

  useEffect(() => {
    if (!!statePeople) {
      // console.log("statePeople", statePeople);
      setDataCards(statePeople);
    }
  }, [statePeople]);
  const pageSize = 5;

  const hideDigits = (params) => {
    let creditCardNumber = params.value;
    let show = creditCardNumber.split(" ");
    return <>**** **** **** {show[3]}</>;
  };

  const colums = [
    {
      field: "cardNumber",
      headerName: "Credit Card Number",
      flex: 1,
      minWidth: 150,
      renderCell: hideDigits,
      // renderCell: (params) => (
      //   <>{params.value + params.row.category}</>
      // ),
    },
    {
      field: "holderName",
      headerName: "Holder Name",
      flex: 1,
      renderCell: (params) => <>{params.value}</>,
    },
    {
      field: "validThru",
      headerName: "Valid Thru",
      flex: 1,
      renderCell: (params) => <>{params.value}</>,
    },
  ];

  return (
    <Box className="mt-2 mb-4">
      <DataGrid
        disableColumnSelector
        disableSelectionOnClick
        autoHeight
        pageSize={pageSize}
        rowsPerPageOptions={[pageSize]}
        rows={dataCards}
        columns={colums}
        getRowId={(row) => row.id}
      />
    </Box>
  );
};

export default TableCards;
