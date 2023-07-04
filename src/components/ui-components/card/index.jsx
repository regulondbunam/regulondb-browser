
import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Tooltip from '@mui/material/Tooltip';
//import PropTypes from "prop-types";

export function showCard(id,view) {
  let detail = {view: view};
  const CARD = document.getElementById("card_"+id);
  if (CARD) {
    const CARD_REACTION = new CustomEvent("updateView", {
      bubbles: true,
      detail: detail,
    });
    CARD.dispatchEvent(CARD_REACTION);
  }
}

function Card({
  children,
  id,
  title = "",
}) {
  const [view, setView] = React.useState(true);

  useEffect(() => {
    const crd = document.getElementById("card_"+id)
    if (crd) {
      crd.addEventListener(
        "updateView",
        (e) => {
          setView(e.detail.view);
        },
        false
      );
    }
  }, [id]);

  return (
    <Box>
      <Paper>
        <div id={"card_"+id} style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", width: "100%", backgroundColor: "#72A7C7" }}>
            <div>
            <Tooltip title={view ? "collapse":"expand"}>
              <IconButton
                sx={{ width: "25px", height: "25px" }}
                aria-label="view"
                onClick={() => {
                  setView(!view);
                }}
              >
                {view ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
              </Tooltip>
            </div>
            <div >
              <h2 style={{color: "white"}} >{title}</h2>
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
