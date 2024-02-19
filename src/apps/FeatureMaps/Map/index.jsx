import React, { useState } from "react";
import "./style.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const colorFunction = {
  activator: "green",
  repressor: "red"
}

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
      positions.push({
        label: "+1",
        value: 1,
        width: zoomLevel
      })
    }positions.push({
      label: ""+position,
      posL: position-zoomLevel,
      posR: position+zoomLevel,
      width: zoomLevel*2
    })
   
  }

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
            <th style={{width: "120px"}} >Regulated Entity</th>
            <th style={{width: "50px"}} >Type</th>
            {positions.map((position, index) => {
              return (
                <th key={"position_map_" + position.label + "_" + index}
                  style={{width: position.width+"px"}}
                >
                  {position.label}
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
          >
            <td>
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
              const features = track.features
              let _features = []
              //distanceTo
              features.forEach(feature => {
                if (feature.distanceTo[distanceTo]>=position.posL && feature.distanceTo[distanceTo]<=position.posR) {
                  const rbs = feature.rbs
                  const size = rbs.rightEndPosition - rbs.leftEndPosition
                  //console.log(position);
                  _features.push(
                    {
                      position: "relative",
                      left: Math.abs(Math.abs(position.posL)-Math.abs(feature.distanceTo[distanceTo]))+"px",
                      width: size+"px",
                      height: "15px",
                      backgroundColor: colorFunction[rbs.function]
                    }
                  )
                }
              });
              return (
                <td key={"position_track_" + position.label + "_" + index} style={{textAlign: "center"}} >
                  <div className="FM_mapCell">
                    <div className="FM_mapLine"  />
                    {_features.map((f,i)=>{
                      return <div key={"feature"} style={f} className="FM_mapFeature" />
                    })}
                    
                  </div>
                  
                 
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
