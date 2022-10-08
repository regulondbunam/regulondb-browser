import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DataTable from "./dataTable";
import { useState, useEffect, useMemo } from "react";

function Table({geneticElements,height = "100px"}) {
    const [_show, set_show] = useState(true);
    

    useEffect(() => {
      let section = document.getElementById("rdb_table_GE");
      if (section) {
        let rect = section.getBoundingClientRect();
        window.scroll({
          top: rect.y + window.pageYOffset,
          behavior: "smooth",
        });
      }
    }, []);

    const jsonTable = useMemo(()=>{
      const columns = [
        {
          headerName: 'ID',
          field: '_id'
        },
        {
          headerName: 'Name',
          field: 'labelName'
        },
        {
          headerName: 'Left Position',
          field: 'leftEndPosition'
        },
        {
          headerName: 'Right Position',
          field: 'rightEndPosition'
        },
        {
          headerName: 'Object Type',
          field: 'objectType'
        },
        {
          headerName: 'Strand',
          field: 'strand'
        },
        {
          headerName: 'color',
          field: 'objectRGBColor'
        }
      ]
      let jsonData = {
        columns: columns,
        rows: []
      }
      geneticElements.forEach(element => {
        jsonData.rows.push({
          id:element._id,
          _id:element._id,
          labelName: element.labelName,
          leftEndPosition: element.leftEndPosition,
          rightEndPosition: element.rightEndPosition,
          objectType: element.objectType,
          strand: element.strand,
          objectRGBColor: element.objectRGBColor
        })
      });
      return jsonData
    },[geneticElements])

    console.log(jsonTable)
    return ( 
        <div id="rdb_table_GE" >
        <div className="rdb_form_title">
          <IconButton
            sx={{ width: "10px", height: "10px" }}
            aria-label="view"
            onClick={() => {
              set_show(!_show);
            }}
          >
            {_show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          <h3>Genetic elements data table</h3>
        </div>
        {_show && (
          <Paper elevation={3} sx={{ padding: "5px", height: height }}>

            <DataTable columns={jsonTable.columns} rows={jsonTable.rows} />
            </Paper>
        )}
        </div>
     );
}

export default Table;