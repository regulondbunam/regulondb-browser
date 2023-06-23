
import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
//import PropTypes from "prop-types";

function Card({
  children,
  id,
  title = "",
  displayCard = true
}) {
  const [view, setView] = React.useState(displayCard);

  return (
    <Box>
      <Paper>
        <div id={id} style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <IconButton
                sx={{ width: "10px", height: "10px" }}
                aria-label="view"
                onClick={() => {
                  setView(!view);
                }}
              >
                {view ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </div>
            <div>
              <h2>{title}</h2>
            </div>
          </div>
        </div>
        <div>
          {view && children}
        </div>
      </Paper>
    </Box>

  )
}

export default Card;
