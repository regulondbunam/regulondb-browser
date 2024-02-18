import React, { useState } from "react";
import "./style.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function Map({ featureData }) {
  console.log(featureData);
  const { map } = featureData;
  const [distanceTo, setDistanceTo] = useState(map.distanceTo[0]);
  const [zoomLevel, setZoomLevel] = useState(50);

  const range = Math.round(
    Math.abs(map.trackLeft - map.trackRight) / zoomLevel
  );
  const positions = []
  for (let i = 0; i < range+1; i++) {
    const position = map.trackLeft + zoomLevel * (i);
    if (position > 1 && position - zoomLevel < 0) {
        positions.push("+1")
    }
    positions.push(""+position)
  }
  console.log(range, zoomLevel);

  const handleChange = (event) => {
    setDistanceTo(event.target.value);
  };

  const handleZoomIn = () => {
    if (zoomLevel - 10 > 0) {
      setZoomLevel((z) => z - 10);
    }
  };

  const handleZoomOut = () => {
    setZoomLevel((z) => z + 10);
  };

  return (
    <div>
      <div className="FM_headerMap">
        <div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Distance To:
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={distanceTo}
              onChange={handleChange}
              label="Distance To"
            >
              {map.distanceTo.map((element) => {
                return <MenuItem value={element}>{element}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
        <div>
          <ButtonGroup variant="contained" size="small">
            <Button onClick={handleZoomIn}>Zoom In</Button>
            <Button onClick={handleZoomOut}>Zoom Out</Button>
          </ButtonGroup>
        </div>
      </div>
      <div style={{overflow: "auto"}} >
      <table className="FM_tableMap" >
        <thead>
          <tr>
            <th style={{minWidth: "140px"}} >Regulated Entity</th>
            <th style={{minWidth: "50px"}} >Type</th>
            {positions.map((position, index) => {
              return (
                <th key={"position_map_" + position + "_" + index}>
                  {position}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
        {Object.keys(featureData.tracks).map((key) => {
        let track = featureData.tracks[key];
        return (
          <tr
            key={"track_" + key}
            style={{
              height: 30,
            }}
          >
            <td
              key={"track_" + key}
              style={{
                backgroundColor: "#cadce7",
                padding: "6px",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                dangerouslySetInnerHTML={{ __html: track.label }}
              />
            </td>
            <td>
            <p
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                dangerouslySetInnerHTML={{ __html: track.type }}
              />
            </td>
            {positions.map((position, index) => {
              return (
                <td key={"position_track_" + position + "_" + index}>
                   | 
                </td>
              );
            })}
          </tr>
        );
      })}
        </tbody>
      </table>
      </div>
     
    </div>
  );
}
