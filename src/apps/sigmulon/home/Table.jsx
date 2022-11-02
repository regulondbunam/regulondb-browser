import React from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function formatSigmulonDataToTable(sigmulonData=[]){
  let tableRows = []
  sigmulonData.forEach((sigmulon)=>{
    let name = sigmulon.sigmaFactor.name
    let gene = sigmulon.sigmaFactor.gene.name
    let statistics = []
    Object.keys(sigmulon.statistics).forEach((key)=>{
      if(key !== "__typename"){
        statistics.push(`${key}: ${sigmulon.statistics[key]}`)
      }
    })
    tableRows.push({
      id: sigmulon._id,
      title: `${name}, gene: ${gene}. (${statistics.join(", ")})`
    })
  })
  return tableRows
}

export default function TableView({
  data,
  type,
}) {
  console.log("sigmulon",data);
  //{id:"",title:"",}
  let tableRows = formatSigmulonDataToTable(data)
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" size="small">
        <TableBody>
          {tableRows.map((row) => (
            <Row key={row.id} row={row} type={type} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Row({ row, type }) {
  //console.log(row);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, padding: "0" }}>
        <TableCell component="th" scope="row">
          <Link to={`/${type}/${row.id}`}>{row.title}</Link>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}