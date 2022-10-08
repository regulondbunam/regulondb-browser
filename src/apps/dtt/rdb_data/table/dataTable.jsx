import React from "react";
import {
  TableContainer,
  Paper,
  TableHead,
  TableBody,
  TableRow,
  Table,
  TableCell,
  TablePagination,
  TableFooter,
} from "@mui/material";
import styles from "./dataTable.module.css";

export default function DataTable({ rows = [], columns = [] }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log("columns", columns);
  console.log("rows", rows);
  return (
    <TableContainer component={Paper}>
      <Table arial-label="Table" size="small">
        <TableHead>
          <TableRow className={styles.headTable}>
            {columns.map((column) => {
              return <th key={column.field}>{column.headerName}</th>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              return (
                <TableRow key={index + "_" + row.id}>
                  {columns.map((column) => {
                    return (
                      <TableCell key={`cell_${row.id}_${column.field}`}>
                        {row[column.field]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[7, { label: "All", value: rows.length }]}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
