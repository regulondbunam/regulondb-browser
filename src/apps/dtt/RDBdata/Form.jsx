import React, { useState } from "react";
import { Accordion, DataVerifier } from "../../../components/ui-components";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import FormHelperText from "@mui/material/FormHelperText";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import MenuList from "@mui/material/MenuList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import ForwardIcon from "@mui/icons-material/Forward";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Check from "@mui/icons-material/Check";
import ListItemIcon from "@mui/material/ListItemIcon";

import {
  RANGE,
  secureRange,
  STATE_FORM,
  FORM_ACTIONS,
  MAX_RANGE,
  STRAND,
  GE_DEFs,
} from "./definitions";

export default function Form({ state = { ...STATE_FORM }, dispatch }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isAll, setIsAll] = useState(false);
  const geMenu = Boolean(anchorEl);
  const handleGEMenu = (event) => {
    if (anchorEl === null) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };
  const handleCloseGEMenu = (event) => {
    setAnchorEl(null);
  };

  const handleSelectAllGeneticElement = () => {
    let elements = [];
    if (isAll) {
      GE_DEFs.forEach((ge) => {
        elements.push({ ...ge, isCheck: false });
      });
    } else {
      GE_DEFs.forEach((ge) => {
        elements.push({ ...ge, isCheck: true });
      });
    }
    dispatch({ type: FORM_ACTIONS.setGeneticsElements, value: elements });
    setIsAll(!isAll);
  };

  const handleSelectGeneticElement = (element, index) => {
    let geElements = [...state.objectType];
    geElements[index] = { ...element, isCheck: !element.isCheck };
    dispatch({ type: FORM_ACTIONS.setGeneticsElements, value: geElements });
  };

  return (
    <div>
      <Accordion title={"Trace Selection Form"}>
        <div style={{ display: "flex", columnGap: "20px" }}>
          <div className="genomePositionSelect">
            <Typography variant="button" display="block">
              Genome Position
            </Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Absolute genome left position">
                <TextField
                  id="rdb_input_leftEndPosition"
                  disabled={state.draw}
                  size="small"
                  label="LeftEndPosition"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  value={
                    state.leftEndPosition === 0 ? "" : state.leftEndPosition
                  }
                  onChange={(event) => {
                    if (!/^\d*$/.test(event.target.value)) {
                      return null;
                    }
                    if (event.target.value < RANGE.min) {
                      return null;
                    }
                    if (event.target.value > RANGE.max) {
                      return null;
                    }
                    //event.target.value
                    if (DataVerifier.isValidNumber(event.target.value)) {
                      dispatch({
                        type: FORM_ACTIONS.setLeftPosition,
                        value: event.target.value,
                      });
                    }
                  }}
                  sx={{ width: 120 }}
                />
              </Tooltip>
              <div className="rdb_middle_input">
                <Tooltip placement="top" title="select strand">
                  <Select
                    variant="standard"
                    size="small"
                    value={state.strand}
                    label="Strand"
                    onChange={(event) => {
                      dispatch({
                        type: FORM_ACTIONS.setStrand,
                        value: event.target.value,
                      });
                    }}
                  >
                    <MenuItem value={STRAND.both}>
                      <Tooltip title={STRAND.both} placement="right">
                        <CompareArrowsIcon />
                      </Tooltip>
                    </MenuItem>
                    <MenuItem value={STRAND.forward}>
                      <Tooltip title={STRAND.forward} placement="right">
                        <ForwardIcon />
                      </Tooltip>
                    </MenuItem>
                    <MenuItem value={STRAND.reverse}>
                      <Tooltip title={STRAND.reverse} placement="right">
                        <ForwardIcon sx={{ transform: "rotate(180deg)" }} />
                      </Tooltip>
                    </MenuItem>
                  </Select>
                </Tooltip>
              </div>
              <Tooltip title="Absolute genome left position">
                <TextField
                  id="rdb_input_leftEndPosition"
                  disabled={state.draw}
                  size="small"
                  label="RightEndPosition"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  type="number"
                  value={
                    state.rightEndPosition === 0 ? "" : state.rightEndPosition
                  }
                  onChange={(event) => {
                    if (!/^\d*$/.test(event.target.value)) {
                      return null;
                    }
                    if (event.target.value < RANGE.min) {
                      return null;
                    }
                    if (event.target.value > RANGE.max) {
                      return null;
                    }
                    if (DataVerifier.isValidNumber(event.target.value)) {
                      dispatch({
                        type: FORM_ACTIONS.setRightPosition,
                        value: event.target.value,
                      });
                    }
                  }}
                  sx={{ width: 120 }}
                />
              </Tooltip>
            </div>
            <Typography variant="caption" display="block" gutterBottom>
              range {RANGE.min}-{RANGE.max}
            </Typography>
          </div>
          <div>
            <Typography variant="button" display="block">
              Display options
            </Typography>
            <div>
              <Button
                variant="outlined"
                endIcon={
                  geMenu ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                }
                onClick={handleGEMenu}
              >
                Genetic Elements
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={geMenu}
                onClose={handleCloseGEMenu}
              >
                <MenuList dense>
                  <MenuItem onClick={handleSelectAllGeneticElement}>
                    <ListItemIcon>{isAll ? <Check /> : <></>}</ListItemIcon>
                    ALL
                  </MenuItem>
                  {state.objectType.map((element, index) => {
                    return (
                      <MenuItem
                        key={element.label + "_" + index}
                        onClick={() => {
                          handleSelectGeneticElement(element, index);
                        }}
                      >
                        <ListItemIcon>
                          {element.isCheck && <Check />}
                        </ListItemIcon>
                        {element.label}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
            </div>
            <FormHelperText>
              Draws the selected elements, provided they are in the selected
              range.
            </FormHelperText>
          </div>
          <div style={{display: "flex", alignItems: "center"}}>
            {state.draw ? (
              <Button
                sx={{ marginRight: "2px" }}
                variant="contained"
                size="medium"
                onClick={() => {
                  dispatch({ type: FORM_ACTIONS.clean });
                }}
              >
                Clean
              </Button>
            ) : (
              <Button
                sx={{ marginRight: "5px" }}
                variant="contained"
                size="medium"
                color="secondary"
                onClick={() => {
                  if(secureRange(state.leftEndPosition,state.rightEndPosition)){
                    dispatch({ type: FORM_ACTIONS.draw });
                  }else{
                    alert("Incorrect positions, please check that the left position is smaller than the right position and that the difference is less than 100,000bp.")
                  }
                  
                }}
              >
                Draw Track
              </Button>
            )}

            <Button
              sx={{ marginRight: "2px" }}
              variant="outlined"
              size="small"
              onClick={() => {
                dispatch({ type: FORM_ACTIONS.demo });
              }}
            >
              Demo
            </Button>
          </div>
        </div>
      </Accordion>
    </div>
  );
}
