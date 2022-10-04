import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import "./form.css";
import { useState } from "react";

const geneticElementsData = [
  "gene",
  "promoter",
  "operon",
  "tf binding site",
  "rna",
  "riboswitch",
  "transnational_attenuator",
  "transcriptional_attenuator",
  "ppGpp",
];

function Form({
  onDraw = () => {},
  onReset = () => {},
  showForm = true,
  minbp = 1,
  maxbp = 4639676,
}) {
  const [_strand, set_strand] = useState("both");
  const [_show, set_show] = useState(showForm);
  const [_leftEndPosition, set_leftEndPosition] = useState(200);
  const [_rightEndPosition, set_rightEndPosition] = useState(3000);
  const [_covered, set_covered] = useState(false);
  const [_geneticElements, set_geneticElements] = useState(geneticElementsData);

  const handleGeneticElementSelection = (event) => {
    const element_n = event.target.value;
    let new_GE = [];
    if (_geneticElements.find((e) => e === element_n)) {
      _geneticElements.forEach((element) => {
        element !== element_n && new_GE.push(element);
      });
      console.log("delete", element_n);
    } else {
      new_GE = new_GE.concat(_geneticElements);
      new_GE.push(element_n);
      console.log("up", element_n);
    }
    console.log(new_GE);
    set_geneticElements(new_GE);
  };

  const _onDraw = () => {
    set_show(false)
    onDraw({
      covered: _covered,
      leftEndPosition: _leftEndPosition,
      objectType: _geneticElements,
      rightEndPosition: _rightEndPosition,
      strand: _strand,
    })
  };

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
          <Paper elevation={3} sx={{ padding: "5px" }}>
            <p className="p_accent"> Genome Position </p> (range {minbp}-{maxbp}
            )
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="rdb_input_position">
                <div>
                  <TextField
                    id="rdb_input_leftEndPosition"
                    size="small"
                    label="LeftEndPosition"
                    type="number"
                    value={_leftEndPosition}
                    onChange={(event) => {
                      set_leftEndPosition(event.target.value);
                    }}
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
                {_strand === "both" && (
                  <p className="p_accent"> {"<- - - ->"} </p>
                )}
                {_strand === "reverse" && (
                  <p className="p_accent"> {"<- - - - -"} </p>
                )}
                {_strand === "forward" && (
                  <p className="p_accent"> {"- - - - ->"} </p>
                )}
                <FormHelperText>selected strand ({_strand})</FormHelperText>
              </div>
              <div className="rdb_input_position">
                <div>
                  <TextField
                    id="rdb_input_rightEndPosition"
                    size="small"
                    label="RightEndPosition"
                    type="number"
                    value={_rightEndPosition}
                    onChange={(event) => {
                      set_rightEndPosition(event.target.value);
                    }}
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
                  value={_strand}
                  label="Strand"
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
            <p className="p_accent"> Display options </p>
            <FormHelperText>
              Draw only the elements that are completely contained in the
              selected range
            </FormHelperText>
            <div style={{ marginLeft: "5%" }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={_covered}
                      onChange={(event) => {
                        set_covered(!_covered);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Covered"
                />
              </FormGroup>
            </div>
            <p className="p_accent"> Display Genetic Elements </p>
            <div>
              <FormHelperText>
                Draws the selected elements, provided they are in the selected
                range.
              </FormHelperText>
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  size="small"
                  value="all"
                  control={
                    <Checkbox
                      checked={_geneticElements.length === 9}
                      indeterminate={
                        _geneticElements.length !== 9 &&
                        _geneticElements.length > 0
                      }
                      onChange={() => {
                        _geneticElements.length === 9
                          ? set_geneticElements([])
                          : set_geneticElements(geneticElementsData);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="All"
                  labelPlacement="top"
                />
                {geneticElementsData.map((element, index) => {
                  return (
                    <FormControlLabel
                      key={`rdb_form_GE${index}_${element}`}
                      value={element}
                      sx={{ fontSize: "10px" }}
                      control={
                        <Checkbox
                          size="small"
                          checked={
                            _geneticElements.find((e) => e === element)
                              ? true
                              : false
                          }
                          onClick={handleGeneticElementSelection}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label={element}
                      labelPlacement="top"
                    />
                  );
                })}
              </FormGroup>
            </div>
            <hr />
            <div className="rdb_inputButton">
              <div>
                <Button
                  sx={{ marginRight: "5px" }}
                  variant="contained"
                  size="medium"
                  color="secondary"
                  onClick={_onDraw}
                >
                  Draw Track
                </Button>
                <Button
                  sx={{ marginRight: "2px" }}
                  variant="contained"
                  size="medium"
                  onClick={()=>{
                    set_show(true)
                    onReset()
                  }}
                >
                  Reset
                </Button>
                <Button
                  sx={{ marginRight: "2px" }}
                  variant="outlined"
                  size="medium"
                >
                  Demo
                </Button>
              </div>
              <div>
                <Button
                  sx={{ marginRight: "2px" }}
                  variant="outlined"
                  size="small"
                >
                  Save Form
                </Button>
                <Button
                  sx={{ marginRight: "2px" }}
                  variant="outlined"
                  size="small"
                >
                  Load Form
                </Button>
                <Button
                  sx={{ marginRight: "2px" }}
                  variant="outlined"
                  size="small"
                >
                  Create Embed
                </Button>
              </div>
            </div>
            <br />
          </Paper>
        )}
      </Box>
    </div>
  );
}

export default Form;
