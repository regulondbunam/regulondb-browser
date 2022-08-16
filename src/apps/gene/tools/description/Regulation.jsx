import React from "react";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";

export default function Regulation({ regulation }) {
  const [_show, set_show] = React.useState(true);

  return (
    <Paper>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <IconButton
            sx={{ width: "10px", height: "10px" }}
            aria-label="view"
            onClick={() => {
              set_show(!_show);
            }}
          >
            {_show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </div>
        <div>
          <h2>Regulation</h2>
        </div>
      </div>
      {
        _show && (
          <div style={{ paddingLeft: "5%" }}>
        {regulation?.operon && (
          <div>
            <Link to={`/operon/${regulation.operon.id}`}>
              <h4
                style={{ color: "#72a7c7" }}
              >{`Operon ${regulation.operon.name}`}</h4>
            </Link>
          </div>
        )}
        {regulation.regulators.length > 0 && (
          <div>
            <h3>Regulators</h3>
            <div style={{ paddingLeft: "5%" }}>
              {regulation.regulators.map((regulator, index) => {
                return (
                  <div key={`regulator${index}_info_${regulator.id}`}>
                    <Link to={`/regulator/${regulator.id}`}>
                      {`${regulator?.function} -- ${regulator?.name}, type ${regulator?.type}`}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
        )
      }
      <br />
    </Paper>
  );
}
