import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

export default function Options({
  cy,
  LAYOUTS = {},
}) {

  const [layout, setLayout] = useState(LAYOUTS.dagre);

  const handleLayout = (value) => {
    setLayout(value);
    cy
      .layout({
        name: value,
        // Otras opciones de configuración del layout
      })
      .run();
  };

  return (
    <div style={{ display: "flex", flexDirection: "row-reverse" }}>
      <Tooltip title="select diagram layout" placement="top">
        <FormControl size="small" variant="standard">
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={layout}
            label="Age"
            onChange={(e) => {
              handleLayout(e.target.value);
            }}
          >
            {Object.keys(LAYOUTS).map((lay, index) => {
              return (
                <MenuItem
                  key={"layoutSet_" + lay + "_" + index}
                  value={LAYOUTS[lay]}
                >
                  {LAYOUTS[lay]}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Tooltip>
      <ButtonGroup size="small" aria-label="small button group">
        <Tooltip title="view full map" placement="top">
          <Button>
            <FullscreenIcon />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </div>
  );
}
