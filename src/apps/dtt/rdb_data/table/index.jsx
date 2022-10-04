import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, useEffect } from "react";

function Table({geneticElements,height = "100px"}) {
    const [_show, set_show] = useState(true);
    console.log(geneticElements)

    useEffect(() => {
      let section = document.getElementById("rdb_table_GE");
      if (section) {
          console.log("hola");
        let rect = section.getBoundingClientRect();
        window.scroll({
          top: rect.y + window.pageYOffset,
          behavior: "smooth",
        });
      }
    }, []);

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
            </Paper>
        )}
        </div>
     );
}

export default Table;