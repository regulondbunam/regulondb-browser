import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DrawingTracesTool from "../../../components/DrawingTracesTool";
import { useState } from "react";

function DrawTrace({
  height = "100px",
  formData,
  set_geneticElements = () => {},
}) {
  const [_show, set_show] = useState(true);
  return (
    <div>
      <div className="rdb_form_title" id="draw_trace">
        <IconButton
          sx={{ width: "10px", height: "10px" }}
          aria-label="view"
          onClick={() => {
            set_show(!_show);
          }}
        >
          {_show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        <h3>Trace Drawing</h3>
      </div>
      {_show && (
        <Paper elevation={3} sx={{ padding: "5px", height: height }}>
          <DrawingTracesTool
            id={"rdb_dti_001"}
            context={"dti"}
            height={height-40}
            leftEndPosition={formData.leftEndPosition}
            rightEndPosition={formData.rightEndPosition}
            strand={formData.strand}
            covered={formData.covered}
            objectType={formData.objectType}
            getGeneticElements={(ge) => {
              set_geneticElements(ge);
            }}
          />
        </Paper>
      )}
    </div>
  );
}

export default DrawTrace;
