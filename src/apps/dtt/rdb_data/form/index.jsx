import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import "./form.css";
import { useState } from "react";

const geneticElementData = [
  { objectType: "", name: "gene" },
  { objectType: "", name: "promoter" },
  { objectType: "", name: "operon" },
  { objectType: "", name: "tf binding site" },
  { objectType: "", name: "rna" },
  { objectType: "", name: "riboswitch" },
  { objectType: "", name: "traslational attenuattor" },
  { objectType: "", name: "trascriptional attenuattor" },
  { objectType: "", name: "ppGpp" },
];

function Form({
  onGo = () => {},
  onReset = () => {},
  minbp = 1,
  maxbp = 4639676,
}) {
  const [strand, set_strand] = useState("both");
  const [_show, set_show] = useState(true);

  return (
    <div className="dtt_form">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
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
          <h3>Track selection form</h3>
        </div>
        {_show && (
          <Paper elevation={3} >
            <p className="p_accent"> Genome Position </p> (range {minbp}-{maxbp}
            )
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="rdb_input_position">
                <div>
                  <TextField
                    id="outlined-number"
                    size="small"
                    label="LeftEndPosition"
                    type="number"
                    defaultValue={200}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div>
                  <FormHelperText>Absolute genome left position</FormHelperText>
                </div>
              </div>
              <div className="rdb_middle_input">
                {strand === "both" && (
                  <p className="p_accent"> {"<- - - ->"} </p>
                )}
                {strand === "reverse" && (
                  <p className="p_accent"> {"<- - - - -"} </p>
                )}
                {strand === "forward" && (
                  <p className="p_accent"> {"- - - - ->"} </p>
                )}
                <FormHelperText>selected strand ({strand})</FormHelperText>
              </div>
              <div className="rdb_input_position">
                <div>
                  <TextField
                    id="outlined-number"
                    size="small"
                    label="RightEndPosition"
                    type="number"
                    defaultValue={3000}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div>
                  <FormHelperText>
                    Absolute genome right position
                  </FormHelperText>
                </div>
              </div>
              <div className="rdb_middle_input">
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  size="small"
                  value={strand}
                  label="Age"
                  onChange={(event) => {
                    set_strand(event.target.value);
                  }}
                >
                  <MenuItem value="both">both</MenuItem>
                  <MenuItem value={"forward"}>forward</MenuItem>
                  <MenuItem value={"reverse"}>reverse</MenuItem>
                </Select>
                <FormHelperText>select strand sequence</FormHelperText>
              </div>
            </div>
          </Paper>
        )}
      </Box>
    </div>
  );
}

export default Form;
