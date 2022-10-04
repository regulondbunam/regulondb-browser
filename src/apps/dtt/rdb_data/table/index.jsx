import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";

function Table({geneticElements}) {
    const [_show, set_show] = useState(true);
    return ( 
        <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
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
          <Paper elevation={3} sx={{ padding: "5px" }}>
            </Paper>
        )}
        </Box>
     );
}

export default Table;